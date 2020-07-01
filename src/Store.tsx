import { observable, action, computed } from "mobx";
import { flatten, fromPairs } from 'lodash';
import React from 'react';
import moment from 'moment'

class Store {
  @observable engine: any;
  @observable userOrgUnits: any[] = [];
  @observable programs: any[] = [];
  @observable selectedOrgUnit: any;
  @observable selectedProgram: any;
  @observable data: any;
  @observable availableAttributes: any[] = [];
  @observable instance: any;
  @observable currentProgramStage: any;
  @observable currentEvent: any;
  @observable currentPage: string = 'list';

  @action setEngine = (engine: any) => this.engine = engine;
  @action setCurrentProgramStage = (stage: any) => () => this.currentProgramStage = stage;
  @action setCurrentEvent = (val: any) => this.currentEvent = val;
  @action setCurrentPage = (val: string) => this.currentPage = val;
  @action loadUserOrgUnits = async () => {

    const query = {
      me: {
        resource: 'me.json',
        params: {
          fields: '*,organisationUnits[*]'
        }
      },
      programs: {
        resource: `programs`,
        params: {
          paging: false,
          fields: 'id,name,displayName,lastUpdated,selectIncidentDatesInFuture,selectEnrollmentDatesInFuture,programType,trackedEntityType,trackedEntity,programTrackedEntityAttributes[mandatory,valueType,displayInList,trackedEntityAttribute[id,code,name,displayName,unique,optionSet[options[name,code]]]],organisationUnits[id,code,name]'
        }
      }
    }

    try {
      const data = await this.engine.query(query);
      this.userOrgUnits = data.me.organisationUnits;
      this.programs = data.programs.programs;
    } catch (e) {
      console.log(e);
    }
  }

  @action setSelectedOrgUnit = async (val: any) => {
    try {
      this.selectedOrgUnit = val;
      this.selectedProgram = null;
    } catch (e) {
      console.log(e);
    }
  }

  @action fetchProgram = async (instance: string, program: string) => {
    const query = {
      program: {
        resource: `programs/${program}`,
        params: {
          fields: 'id,name,displayName,lastUpdated,selectIncidentDatesInFuture,selectEnrollmentDatesInFuture,programType,trackedEntityType,trackedEntity,programTrackedEntityAttributes[mandatory,valueType,displayInList,trackedEntityAttribute[id,code,name,displayName,unique,optionSet[options[name,code]]]],programStages[id,name,displayName,repeatable,programStageSections[id,name,dataElements[id,name,displayFormName,valueType,optionSet[options[name,code]]]],programStageDataElements[compulsory,displayInReports,sortOrder,dataElement[id,code,valueType,displayFormName,optionSet[options[name,code]]]]],organisationUnits[id,code,name],categoryCombo[id,name,categories[id,name,code,categoryOptions[id,name,code]],categoryOptionCombos[id,name,categoryOptions[id,name]]]'
        }
      },
      instance: {
        resource: `trackedEntityInstances/${instance}.json`,
        params: {
          fields: '*'
        }
      }
    }

    try {
      const data = await this.engine.query(query);
      this.currentProgramStage = data.program.programStages[0].id
      this.selectedProgram = data.program;
      this.instance = data.instance
    } catch (e) {
      console.log(e);
    }
  }

  @action loadOrganisationUnitsChildren = async (parent: string) => {
    const query = {
      organisations: {
        resource: `organisationUnits.json`,
        params: {
          filter: `id:in:[${parent}]`,
          paging: 'false',
          fields: 'children[id,name,path,leaf]'
        }
      },
    }
    try {
      const data = await this.engine.query(query);
      const found = data.organisations.organisationUnits.map((unit: any) => {
        return unit.children.map((child: any) => {
          return { ...child, pId: parent }
        })
      });
      const all = flatten(found);
      this.userOrgUnits = [...this.userOrgUnits, ...all];
    } catch (e) {
      console.log(e);
    }
  }

  @action setAvailableAttributes = (val: any) => (this.availableAttributes = val);

  @action includeColumns = (id: string) => (e: any) => {
    const attributes = this.availableAttributes.map((col) => {
      if (col.id === id) {
        return { ...col, selected: e.target.checked };
      }
      return col;
    });
    this.setAvailableAttributes(attributes);
  };

  @action setSelectedProgram = async (program: any) => {
    try {
      this.selectedProgram = this.orgUnitPrograms.find((o: any) => o.id === program);
      await this.queryTrackedEntityInstances();
      this.availableAttributes = this.selectedProgram.programTrackedEntityAttributes.map((pa: any) => {
        const { displayInList: selected, trackedEntityAttribute } = pa;
        return { ...trackedEntityAttribute, selected };
      });
    } catch (e) {
      console.log(e);
    }
  };

  @action queryTrackedEntityInstances = async () => {
    if (this.selectedOrgUnit && this.selectedProgram) {
      const query1 = {
        trackedEntityInstances: {
          resource: 'trackedEntityInstances/query.json',
          params: {

            program: this.currentProgram,
            ou: this.selectedOrgUnit
          }
        }
      }
      try {
        const data = await this.engine.query(query1);
        const headers = data.trackedEntityInstances.headers.map((h: any) => h["name"]);
        this.data = data.trackedEntityInstances.rows.map((r: any) => {
          return Object.assign.apply(
            {},
            headers.map((v: any, i: number) => ({
              [v]: r[i],
            }))
          );
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  @action addTrackedEntityInstance = async (trackedEntityInstances: any) => {
    let createMutation: any = {
      type: 'create',
      resource: 'trackedEntityInstances',
      data: { trackedEntityInstances }
    }
    try {
      await this.engine.mutate(createMutation);
      await this.queryTrackedEntityInstances();
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
    this.setCurrentPage('list');
  }


  @computed
  get organisationUnits() {
    const units = this.userOrgUnits.map((unit: any) => {
      return { id: unit.id, pId: unit.pId || '', value: unit.id, title: unit.name, isLeaf: unit.leaf, key: unit.id }
    });
    return units;
  }

  @computed get orgUnitPrograms() {
    return this.programs.filter((program: any) => {
      return program.organisationUnits.find((orgUnit: any) => {
        return orgUnit.id === this.selectedOrgUnit;
      })
    })
  }

  @computed get currentProgram() {
    if (this.selectedProgram) {
      return this.selectedProgram.id
    }
    return null;
  }

  @computed get columns() {
    return this.availableAttributes
      .filter((a: any) => a.selected).map((a) => {
        return {
          key: a.id,
          title: a.name,
          dataIndex: a.name,
          sorter: true,
          render: (text: any, row: any) => {
            // if (has(this.attributesWithOptionSet, a.name)) {
            //   return (
            //     <div>
            //       {
            //         this.options[this.attributesWithOptionSet[a.name]][
            //           row[a.name]
            //         ]
            //       }
            //     </div>
            //   );
            // }
            return <div>{row[a.id]}</div>;
          },
        };
      })
  }

  @computed get currentData() {
    if (this.instance) {
      const enrollment = this.instance.enrollments[0];
      const { events } = enrollment;
      return events.filter((event: any) => {
        return event.programStage === this.currentProgramStage
      })
    }
    return []
  }

  @computed get isRepeatable() {
    return this.currentProgramStageDetails && this.currentProgramStageDetails.repeatable
  }


  @computed get currentProgramStageDetails() {
    if (this.selectedProgram && this.currentProgramStage) {
      const stageInfo = this.selectedProgram.programStages.find((stage: any) => stage.id === this.currentProgramStage);
      return stageInfo
    }
    return null
  }

  @computed get programStageColumns() {
    if (this.isRepeatable) {
      return this.currentProgramStageDetails.programStageDataElements.filter((psde: any) => psde.displayInReports).map((a: any) => {
        return {
          key: a.dataElement.id,
          title: a.dataElement.displayFormName,
          dataIndex: a.dataElement.id,
          sorter: true,
          render: (text: any, row: any) => {
            return <div>{row[a.dataElement.id]}</div>;
          },
        };
      })
    }
    return []
  }

  @computed get dateFields() {

    if (this.currentProgramStageDetails) {
      const dataElements = this.currentProgramStageDetails.programStageDataElements.filter((psde: any) => psde.dataElement.valueType === 'DATE').map((a: any) => {
        return a.dataElement.id
      });

      return [...dataElements, 'eventDate']
    }

    return []

  }

  @computed get currentProcessedData() {
    return this.currentData.map((e: any) => {
      const { eventDate, dataValues, event } = e;

      const realValues = fromPairs(dataValues.map((dv: any) => {
        let value = dv.value;
        if (this.dateFields.indexOf(dv.dataElement) !== -1) {
          value = moment(value)
        }
        return [dv.dataElement, value]
      }));
      return { ...realValues, eventDate: moment(eventDate), event }
    });
  }


  @computed get currentProgramStageSections() {
    if (this.currentProgramStageDetails) {
      return this.currentProgramStageDetails.programStageSections
    }
    return []
  }

  @computed get currentAttributes() {
    if (this.selectedProgram) {
      const attributes = this.selectedProgram.programTrackedEntityAttributes.map((a: any) => {
        const { trackedEntityAttribute, valueType } = a;
        return { ...trackedEntityAttribute, valueType }

      });
      return [{ name: 'FIRST DATE OF UPCOMING SEASON', valueType: 'DATE', id: 'enrollmentDate' }, ...attributes]
    }
    return [];
  }

  @computed get disableAddButton() {
    return !this.isRepeatable && this.currentProcessedData.length > 0
  }

  @computed get currentTeamName() {
    if (this.instance) {
      const { orgUnit } = this.instance.enrollments[0];
      const organisation = this.selectedProgram.organisationUnits.find((o: any) => o.id === orgUnit);
      return this.selectedProgram.categoryCombo.categories.find((c: any) => c.id === 'K1YcxEoSq1B')
        .categoryOptions.filter((co: any) => String(co.name).toLowerCase().startsWith(String(organisation.name).toLowerCase()))
        .map((o: any) => {
          return {
            code: o.id,
            name: o.name
          }
        });
    }
    return []
  }

  @computed get currentTeamType() {
    if (this.selectedProgram) {
      return this.selectedProgram.categoryCombo.categories.find((c: any) => c.id !== 'K1YcxEoSq1B').categoryOptions.map((o: any) => {
        return {
          code: o.id,
          name: o.name
        }
      });
    }
    return []
  }

  @computed get eventModalForm() {
    return [{ displayFormName: 'Team Name', valueType: 'TEXT', id: 'K1YcxEoSq1B', optionSets: { options: this.currentTeamName } }]
  }

}

export const store = new Store();