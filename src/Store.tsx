import { flatten, fromPairs, keys, sum, isEmpty, invert } from 'lodash';
import { action, computed, observable } from "mobx";
import moment from 'moment';
import React from 'react';
import { addValues, convertValues, getParentKey, performOperation } from './utils';

class Store {
  @observable engine: any;
  @observable userOrgUnits: any[] = [];
  @observable programs: any[] = [];
  @observable selectedOrgUnit: any;
  @observable selectedProgram: any;
  @observable currentProgramId: string = '';
  @observable data: any;
  @observable availableAttributes: any[] = [];
  @observable instance: any;
  @observable currentProgramStage: string = 'nNMTjdvTh7r';
  @observable currentEvent: any;
  @observable currentPage: string = 'list';
  @observable disabled: string[] = [];
  @observable loading: boolean = false;
  @observable expandedKeys: string[] = ['MAGkzcmHxwc'];
  @observable selectedKeys: string[] = [];
  @observable checkedKeys: string[] = [];
  @observable autoExpandParent: boolean = true;
  @observable form: any;
  @observable expandedRows: string[] = []

  @observable disabledElements = [
    "WyNHgVjv97i",
    "PTeqHUCZVFd",
    "qP3onIBOoJa",
    "fFe4xMmrPZZ",
    "JZo5Iw4geHp",
    "DwH5Iwha3UU",
    "jZLnPmp18hY",
    "kJPWSamlUAK",
    "puXos8qdR9S",
    "j8heE20u1T9",
    "KLzfFndIPqo",
    "lOzK4T2eTga",
    "M9pi5hjxhWr",
    "awxAGJwj83W",
    "iSDnwU0GRAL",
    "m0MhcXsb60u",
    "mybOLY5lriU",
    "CFn6FkmHuHH",
    "c6D0SVzxt7A",
    "LaBr26m8aNY",
    "g0K25Yvn0IH",
    "F4PyCcIgvZ1",
    "OmOmbzDM4iZ",
    "DT02jGe9med",
    "dr6OgCteAUm",
    "gY8m7JwBy9p",
    "eiHYxW2Ybjv",
    "CiOsAwrfUaP"
  ]

  @observable inheritable = {
    gsPwEWxXI6e: 'T8LURcyruHH',
    W83hRUEbXjo: 'gY8m7JwBy9p',
    XIqu530X3BA: 'Pn0OtdJRu86',
    uvWrgEqv06F: 'FElEeHFA2h5',
    WEV1hAZk1zl: 'RU20DkMfdnO',
    oMZGOrVDzlQ: 'JbAG8Lkkd7i',
    Jhix7kMMW5f: 'uGhQNyatC3M',
    pin6sarb8cc: 'PGCvDSP3Y9S',
    sqckP81B8Go: 'lum3A7SVxKV',
    YUH3uoLn1me: 'uV7btUiA1BV',

    g3segTGp2yD: 'PBoWbvQCCgU',
    oyXv9gX46VO: 'rTM2F2nasVt',
    pbr4BhkiWtL: 'gIbnnt1blgn',
    uA3G2zQ14rk: 'Zyq0YzgrLXE',
    nDgN4uKcSPo: 'NW5djyBqFNg',

    Wxa3cC9tjUK: 'vBryBZc6Ihn',
    qKTeyWi7MVz: 'Wc2l37D0lvC',

    JbckYmJRNSl: 'ZmThLdyIMn0',
    F04W7zc8KgV: 'xCR6kMruEIb',
    PNleJ4ejsuW: 'EylCEWx1bYJ',
    rE38dvsAtEw: 'NlKNTt8lRtc',

    PGoc4AXIskG: 'sFBv4FIYydi',
    zCSkGEoyFkV: 'GeiyLk2U1qI',
    fLD4wuUVi1i: 'TX3vq0b6f8R',
    cEQikKW778D: 'H6lgwocDrTy',
    // tyCCqrl6t1v: 'aRfwyyBIHjp',
    // Z9LUqA3qR3i: 'hJDbRV78VWp'
  }

  @observable hiddenSections: string[] = [];
  @observable hiddenDataElements: string[] = [];

  @observable affected: any = {
    DLmm6TZXbxO: 'W83hRUEbXjo',
    zrVBd7rIed2: 'WEV1hAZk1zl',
    RGc7vhjB0Mt: 'zCSkGEoyFkV',
    psv1I7yysVD: 'fLD4wuUVi1i'
  }

  @observable countries: any[] = [];
  @observable teamType: string = ''
  @observable descendants: any[] = []

  @action setEngine = async (engine: any) => {
    this.engine = engine;
  }

  @action setTeamType = (val: any) => this.teamType = val;
  @action setDescendants = (val: any) => this.descendants = val;

  @action setExpandedRows = (events: string[]) => this.expandedRows = events
  @action setForm = (val: any) => this.form = val;
  @action setCounties = (val: any) => this.countries = val;
  @action setCurrentProgramStage = (stage: any) => () => {
    this.currentProgramStage = stage;
    this.setExpandedRows([]);
    if (stage === 'nNMTjdvTh7r' && !isEmpty(this.getTemplateData)) {
      this.setCurrentEvent(this.getTemplateData.event);
    }
  }
  @action setCurrentEvent = (val: any) => this.currentEvent = val;
  @action setCurrentPage = (val: string) => this.currentPage = val;
  @action setPrograms = (val: any) => this.programs = val;
  @action setUserOrgUnits = (val: any) => this.userOrgUnits = val;
  @action enable = (val: string) => this.disabled = [...this.disabled, val];
  @action disable = (val: string) => this.disabled = this.disabled.filter((e: string) => e !== val);
  @action hideSection = (val: string) => {
    this.hiddenSections = [...this.hiddenSections, val]
  }
  @action hideDataElement = (val: string) => {
    this.hiddenDataElements = [...this.hiddenDataElements, `${this.currentEvent}-${val}`]
  }
  @action unHideSection = (val: string) => {
    this.hiddenSections = this.hiddenSections.filter((v: string) => v !== val);
  }
  @action unHideDataElement = (val: string) => {
    this.hiddenDataElements = this.hiddenDataElements.filter((v: string) => v !== `${this.currentEvent}-${val}`);
  }

  @action setSelectedOrgUnit = async (selectedKeys: any[], info: any) => {
    try {
      this.selectedOrgUnit = selectedKeys[0];
      this.selectedKeys = selectedKeys;
      if (this.orgUnitPrograms.length > 0) {
        this.selectedProgram = this.orgUnitPrograms[0];
        this.availableAttributes = this.selectedProgram.programTrackedEntityAttributes.map((pa: any) => {
          const { displayInList: selected, trackedEntityAttribute } = pa;
          return { ...trackedEntityAttribute, selected };
        });
        await this.queryTrackedEntityInstances()
      }
    } catch (e) {
      console.log(e);
    }
  }

  @action disableFields(ds: string[], disabled: boolean, remove: boolean = false) {
    if (this.selectedProgram && this.currentProgramStageDetails) {
      const programStageSections = this.currentProgramStageDetails.programStageSections.map((ps: any) => {
        let { dataElements, ...others } = ps;
        dataElements = dataElements.map((de: any) => {
          if (remove) {
            return { ...de, disabled: false }
          }
          if (ds.indexOf(de.id) !== -1 || this.disabledElements.indexOf(de.id) !== -1) {
            return { ...de, disabled }
          }
          return de
        });
        return { ...others, dataElements }
      });

      const programStages = this.selectedProgram.programStages.map((ps: any) => {
        if (ps.id === this.currentProgramStage) {
          return { ...ps, programStageSections }
        }
        return ps
      });
      this.selectedProgram = { ...this.selectedProgram, programStages }
    }
  }
  @action changeClassName(ds: string, className: string) {
    if (this.selectedProgram && this.currentProgramStageDetails) {
      const programStageSections = this.currentProgramStageDetails.programStageSections.map((ps: any) => {
        let { dataElements, ...others } = ps;
        dataElements = dataElements.map((de: any) => {
          if (ds === `${this.currentEvent}-${de.id}`) {
            return { ...de, className }
          }
          return de
        });
        return { ...others, dataElements }
      });

      const programStages = this.selectedProgram.programStages.map((ps: any) => {
        if (ps.id === this.currentProgramStage) {
          return { ...ps, programStageSections }
        }
        return ps
      });
      this.selectedProgram = { ...this.selectedProgram, programStages }
    }
  }

  @action changeOptions = () => {
    const programStageSections = this.currentProgramStageDetails.programStageSections.map((ps: any) => {
      let { dataElements, ...others } = ps;
      dataElements = dataElements.map((de: any) => {
        if (de.id === 'gIyHDZCbUFN') {
          de = { ...de, optionSet: { options: this.currentDescendants } }
        }
        return de
      });
      return { ...others, dataElements }
    });

    const programStages = this.selectedProgram.programStages.map((ps: any) => {
      if (ps.id === this.currentProgramStage) {
        return { ...ps, programStageSections }
      }
      return ps
    });
    this.selectedProgram = { ...this.selectedProgram, programStages }
  }

  @action queryTrackedEntityInstance = async (instance: string, refresh: boolean = true) => {
    this.loading = refresh;
    const query = {
      instance: {
        resource: `trackedEntityInstances/${instance}.json`,
        params: {
          fields: '*'
        }
      }
    }

    try {
      const data = await this.engine.query(query);
      this.instance = data.instance;
      this.selectedOrgUnit = this.instance.orgUnit;
      if (this.currentProgramStage === 'nNMTjdvTh7r' && !isEmpty(this.getTemplateData)) {
        this.currentEvent = this.getTemplateData.event;
        this.disableFields(['gY8m7JwBy9p', 'sFBv4FIYydi', 'RU20DkMfdnO', 'GeiyLk2U1qI', 'H6lgwocDrTy', 'TX3vq0b6f8R'], true);
      }
    } catch (e) {
      console.log(e);
    }
    this.loading = false;
  }

  @action loadOrganisationUnitDescendants = async () => {
    const query = {
      units: {
        resource: `organisationUnits/${this.selectedOrgUnit}.json`,
        params: {
          includeDescendants: 'true',
          fields: 'id,name,description'
        }
      }
    }
    const { units: { organisationUnits } } = await this.engine.query(query);
    this.setDescendants(organisationUnits.filter((ou: any) => ou.id !== this.selectedOrgUnit))
  }

  @action loadCurrentInstance = async (program: any, instance: any) => {
    store.setCurrentProgramId(program);
    await store.queryTrackedEntityInstance(instance);
    await store.loadOrganisationUnitDescendants();
  }

  @action loadOrganisationUnitsChildren = async (parent: string) => {
    const query = {
      organisations: {
        resource: `organisationUnits.json`,
        params: {
          filter: `id:in:[${parent}]`,
          paging: 'false',
          fields: 'id,level,children[id,name,level,path,leaf]'
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

  @action setCurrentProgramId = (val: string) => {
    this.currentProgramId = val;
    if (val) {
      this.selectedProgram = this.programs.find((o: any) => o.id === val);
      this.availableAttributes = this.selectedProgram.programTrackedEntityAttributes.map((pa: any) => {
        const { displayInList: selected, trackedEntityAttribute } = pa;
        return { ...trackedEntityAttribute, selected };
      });
    } else {
      this.selectedProgram = null;
    }
  }

  @action setSelectedProgram = async (program: any) => {
    this.setCurrentProgramId(program);
    try {
      await this.queryTrackedEntityInstances();
      this.availableAttributes = this.selectedProgram.programTrackedEntityAttributes.map((pa: any) => {
        const { displayInList: selected, trackedEntityAttribute } = pa;
        return { ...trackedEntityAttribute, selected };
      });
    } catch (e) {
      console.log(e);
    }
  };

  @action queryTrackedEntityInstances = async (loading: boolean = true) => {
    if (this.selectedOrgUnit && this.selectedProgram) {
      this.loading = loading;
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
        this.loading = false;
      } catch (e) {
        this.loading = false
        console.log(e);
      }
    }
  }

  @action addTrackedEntityInstance = async (trackedEntityInstances: any, loading = true) => {
    let createMutation: any = {
      type: 'create',
      resource: 'trackedEntityInstances',
      data: { trackedEntityInstances }
    }
    try {
      await this.engine.mutate(createMutation);
      await this.queryTrackedEntityInstances(loading);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
    this.setCurrentPage('list');
  }

  @action addTrackedEntityInstance2 = async (trackedEntityInstances: any) => {
    let createMutation: any = {
      type: 'create',
      resource: 'trackedEntityInstances',
      data: { trackedEntityInstances }
    }
    try {
      await this.engine.mutate(createMutation);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
    this.setCurrentPage('list');
  }

  @action addEvent = async (events: any, refresh: boolean = true) => {
    let createMutation: any = {
      type: 'create',
      resource: 'events.json',
      data: { events }
    }
    try {
      await this.engine.mutate(createMutation);
      await this.queryTrackedEntityInstance(this.enrollment.trackedEntityInstance, refresh);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
    this.setCurrentPage('list');
  }
  @action changeDataElementValue = (element: string, currentValue: number) => {
    if (this.currentProgramStage && this.currentEvent && this.instance) {
      const enrollments = this.instance.enrollments.map((enrollment: any) => {
        let { events, ...others } = enrollment;
        events = events.map((event: any) => {
          if (event.programStage === this.currentProgramStage && event.event === this.currentEvent) {
            let { dataValues, ...rest } = event;
            dataValues = dataValues.map((dv: any) => {
              if (dv.dataElement === element) {
                dv = { ...dv, newValue: currentValue }
              }
              return dv;
            });
            event = { ...rest, dataValues }
          }
          return event
        });
        return { ...others, events }
      });
      this.instance = { ...this.instance, enrollments };
      // console.log(JSON.stringify(this.instance));
    }
  }

  @action deleteEvent = async () => {
    const deleteMutation = {
      type: 'delete',
      resource: 'events',
      id: this.currentEvent,
    }
    try {
      await this.engine.mutate(deleteMutation);
      await this.queryTrackedEntityInstance(this.enrollment.trackedEntityInstance);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  }

  @action deleteTrackedEntityInstance = async () => {
    const deleteMutation = {
      type: 'delete',
      resource: 'trackedEntityInstances',
      id: this.enrollment.trackedEntityInstance,
    }
    try {
      await this.engine.mutate(deleteMutation);
      await this.queryTrackedEntityInstances();
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  }

  @action onExpand = (expandedKeys: any) => {
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  };

  @action onChange = async (value: any) => {
    if (value) {
      this.expandedKeys = [getParentKey(value, this.userOrgUnits)];
      this.autoExpandParent = true;
      this.selectedKeys = [value]
      await this.setSelectedOrgUnit(this.selectedKeys, "")
    } else {
      this.expandedKeys = ['MAGkzcmHxwc'];
    }
  }

  @computed
  get organisationUnits() {
    const units = this.userOrgUnits.map((unit: any) => {
      return { id: unit.id, pId: unit.pId || '', value: unit.id, title: unit.name, isLeaf: unit.level === 4, key: unit.id }
    });
    return units;
  }

  @computed get orgUnitPrograms() {
    if (this.selectedOrgUnit) {
      return this.programs.filter((program: any) => {
        return program.organisationUnits.find((orgUnit: any) => {
          return orgUnit.id === this.selectedOrgUnit;
        })
      })
    }

    return []
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

  @computed get teamGrantData() {
    if (this.instance) {
      const enrollment = this.instance.enrollments[0];
      const { events } = enrollment;
      return events.filter((event: any) => {
        return event.programStage !== 'nNMTjdvTh7r'
      })
    }
    return []
  }

  @computed get currentAttributeValues() {
    if (this.instance) {
      const { attributes } = this.instance;
      return fromPairs(attributes.map((dv: any) => {
        return [dv.attribute, dv.value]
      }))
    }
    return {}
  }

  @computed get enrollment() {
    if (this.instance) {
      const { enrollment, orgUnit, program, trackedEntityInstance } = this.instance.enrollments[0];
      return {
        enrollment,
        orgUnit,
        program,
        trackedEntityInstance,
        programStage: this.currentProgramStage
      }
    }
    return {}
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
        const clss = String(a.dataElement.valueType).indexOf('INTEGER') !== -1 ? 'text-right' : 'text-left'
        return {
          key: a.dataElement.id,
          title: a.dataElement.displayFormName,
          dataIndex: a.dataElement.id,
          // sorter: true,
          render: (text: any, row: any) => {
            const result = row[`${row.event}-${a.dataElement.id}`] || text
            if (a.dataElement.optionSet) {
              const option = a.dataElement.optionSet.options.find((o: any) => o.code === result);
              if (option) {
                return option.name
              }
            }
            return <div className={clss}>{result}</div>;
          },
        };
      });
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
      const { eventDate, dataValues, event, status } = e;
      // const { eventDate, dataValues, event, attributeCategoryOptions, status } = e;
      // const aco = String(attributeCategoryOptions).split(';');
      const realValues = fromPairs(dataValues.map((dv: any) => {
        let value = dv.value;
        if (this.dateFields.indexOf(dv.dataElement) !== -1) {
          value = moment(value)
        }
        return [`${event}-${dv.dataElement}`, value]
      }));
      // const s1 = this.currentTeamType.map((x: any) => x.code).indexOf(aco[0]) !== -1 ? aco[0] : aco[1]
      // const s2 = this.currentTeamName.map((x: any) => x.code).indexOf(aco[0]) !== -1 ? aco[0] : aco[1]
      // return { ...realValues, [`${event}-eventDate`]: moment(eventDate), event, [`${event}-wlEpNQNoR9F`]: s1, [`${event}-K1YcxEoSq1B`]: s2, [`${event}-status`]: status }
      return { ...realValues, [`${event}-eventDate`]: moment(eventDate), event, [`${event}-status`]: status }
    });
  }

  @computed get processedTeamGrantData() {
    return this.teamGrantData.map((e: any) => {
      const { eventDate, status, dataValues, event } = e;
      let realValues = fromPairs(dataValues.map((dv: any) => {
        let value = dv.value;
        if (this.dateFields.indexOf(dv.dataElement) !== -1) {
          value = moment(value)
        }
        return [dv.dataElement, value]
      }));
      if (String(realValues.sBHTpu7aWMW) === 'true') {
        const { event: templateEvent } = this.getTemplateData;
        const rate = this.getTemplateData[`${templateEvent}-vz7oWyEKTv2`] || 1
        const invertedChecked = invert(store.affected);
        Object.entries(this.inheritable).forEach(([de, value]) => {
          const hasChecked = invertedChecked[de];
          let val = this.getTemplateData[`${templateEvent}-${value}`];

          if (de === 'pin6sarb8cc') {
            const templateContacts = Number(store.getTemplateData[`${templateEvent}-PGCvDSP3Y9S`])
            const templateMPS = Number(store.getTemplateData[`${templateEvent}-gY8m7JwBy9p`])
            const teamGrantMPS = Number(realValues['W83hRUEbXjo']);
            val = Math.ceil((templateContacts / templateMPS) * teamGrantMPS);
          }
          if ((hasChecked !== undefined && String(realValues[hasChecked]) !== 'true') || hasChecked === undefined) {
            realValues = { ...realValues, [de]: val }
          }
        });

        realValues = performOperation(realValues, 'tyCCqrl6t1v', 'gsPwEWxXI6e', 'W83hRUEbXjo', '/');
        realValues = performOperation(realValues, 'W83hRUEbXjo', 'XIqu530X3BA', 'PGoc4AXIskG', '*');
        realValues = performOperation(realValues, 'PGoc4AXIskG', 'uvWrgEqv06F', 'WEV1hAZk1zl', '/');
        realValues = performOperation(realValues, 'Z9LUqA3qR3i', 'Jhix7kMMW5f', 'zCSkGEoyFkV', '/');
        realValues = performOperation(realValues, 'zCSkGEoyFkV', 'pin6sarb8cc', 'cEQikKW778D', '+');
        realValues = performOperation(realValues, 'zCSkGEoyFkV', 'sqckP81B8Go', 'fLD4wuUVi1i', '/');

        realValues = addValues(['BoM0YNDBUdy', 'VxTZaIwIfS8', 'gtPZBBL7rhj', 'UazX97Kqd3p'], realValues, 'dr6OgCteAUm');
        realValues = addValues(['IZdmRdDWZpX', 'klxMWtWKP3v', 'Qs4QGZ9HoDC', 'tSZLIplM0Xg'], realValues, 'DT02jGe9med');
        realValues = addValues(['dr6OgCteAUm', 'DT02jGe9med'], realValues, 'OmOmbzDM4iZ');

        realValues = convertValues(rate, 'BoM0YNDBUdy', 'DwH5Iwha3UU', realValues);
        realValues = convertValues(rate, 'VxTZaIwIfS8', 'jZLnPmp18hY', realValues);
        realValues = convertValues(rate, 'gtPZBBL7rhj', 'kJPWSamlUAK', realValues);
        realValues = convertValues(rate, 'UazX97Kqd3p', 'puXos8qdR9S', realValues);
        realValues = convertValues(rate, 'dr6OgCteAUm', 'j8heE20u1T9', realValues);


        realValues = convertValues(rate, 'IZdmRdDWZpX', 'm0MhcXsb60u', realValues);
        realValues = convertValues(rate, 'klxMWtWKP3v', 'mybOLY5lriU', realValues);
        realValues = convertValues(rate, 'Qs4QGZ9HoDC', 'CFn6FkmHuHH', realValues);
        realValues = convertValues(rate, 'tSZLIplM0Xg', 'c6D0SVzxt7A', realValues);
        realValues = convertValues(rate, 'DT02jGe9med', 'LaBr26m8aNY', realValues);


        const i = Number(realValues['g3segTGp2yD']) || 0;
        const c = Number(realValues['W83hRUEbXjo']) || 0;
        const j = Number(realValues['oyXv9gX46VO']) || 0;
        const g = Number(realValues['WEV1hAZk1zl']) || 0;
        const h = Number(realValues['oMZGOrVDzlQ']) || 0;
        const k = Number(realValues['pbr4BhkiWtL']) || 0;
        const v = Number(realValues['Wxa3cC9tjUK']) || 0;
        const t = Number(realValues['fLD4wuUVi1i']) || 0;
        const u = Number(realValues['YUH3uoLn1me']) || 0;
        const e = Number(realValues['PGoc4AXIskG']) || 0;
        const l = Number(realValues['uA3G2zQ14rk']) || 0;
        const r = Number(realValues['cEQikKW778D']) || 0;
        const w = Number(realValues['qKTeyWi7MVz']) || 0;
        const m = Number(realValues['nDgN4uKcSPo']) || 0;
        const ab = Number(realValues['eiHYxW2Ybjv']) || 0;
        const x = Number(realValues['JbckYmJRNSl']) || 0;
        const y = Number(realValues['F04W7zc8KgV']) || 0;
        const z = Number(realValues['PNleJ4ejsuW']) || 0;
        const aa = Number(realValues['rE38dvsAtEw']) || 0;
        const ac = Number(realValues['CiOsAwrfUaP']) || 0;

        const transportGrant = (i * 3 * Math.ceil(c / 40)) + (j * 3 * 4) + (g * h * k) + (v * t * u);
        const mpEventSnaks = e * l;
        const tgjEventMeals = r * w;
        const admin = m * c;

        realValues = { ...realValues, WyNHgVjv97i: Math.ceil(transportGrant) };
        realValues = { ...realValues, PTeqHUCZVFd: Math.ceil(mpEventSnaks) };
        realValues = { ...realValues, qP3onIBOoJa: Math.ceil(tgjEventMeals) };
        realValues = { ...realValues, fFe4xMmrPZZ: Math.ceil(admin) };

        realValues = { ...realValues, KLzfFndIPqo: x * ab * 2 };
        realValues = { ...realValues, lOzK4T2eTga: y * ab * 2 };
        realValues = { ...realValues, M9pi5hjxhWr: z * ab * 2 };
        realValues = { ...realValues, awxAGJwj83W: aa * ac };

        realValues = addValues(['WyNHgVjv97i', 'PTeqHUCZVFd', 'qP3onIBOoJa', 'fFe4xMmrPZZ'], realValues, 'JZo5Iw4geHp')
        realValues = addValues(['KLzfFndIPqo', 'lOzK4T2eTga', 'M9pi5hjxhWr', 'awxAGJwj83W'], realValues, 'iSDnwU0GRAL')

        realValues = addValues(['j8heE20u1T9', 'JZo5Iw4geHp'], realValues, 'g0K25Yvn0IH')
        realValues = addValues(['LaBr26m8aNY', 'iSDnwU0GRAL'], realValues, 'F4PyCcIgvZ1')

      }
      return { ...realValues, eventDate: moment(eventDate), event, status }
    });
  }

  @computed get total() {
    const values = this.currentProcessedData.filter((dv: any) => keys(dv).indexOf(`${dv.event}-g0K25Yvn0IH`) !== -1 && !!dv[`${dv.event}-g0K25Yvn0IH`]).map((dv: any) => Number(dv[`${dv.event}-g0K25Yvn0IH`]));
    return { g0K25Yvn0IH: sum(values), gIyHDZCbUFN: 'Total', event: 'total' };
  }

  @computed get allData() {
    return [...this.currentProcessedData, this.total]
  }

  @computed get currentEventData() {
    if (this.currentEvent) {
      const search = this.allData.find((d: any) => d.event === this.currentEvent);
      return search || {}
    }
    return {}
  }

  @computed get currentProgramStageSections() {
    if (this.currentProgramStageDetails) {
      return this.currentProgramStageDetails.programStageSections.filter((ps: any) => {
        return this.hiddenSections.indexOf(ps.id) === -1
      }).map((ps: any) => {
        let { dataElements, ...others } = ps;
        dataElements = dataElements.filter((de: any) => {
          return this.hiddenDataElements.indexOf(de.id) === -1
        }).map((de: any) => {
          if (de.id === 'gIyHDZCbUFN') {
            de = { ...de, optionSet: { options: [] } }
          }
          return de
        });
        return { ...others, dataElements }
      })
    }
    return []
  }

  @computed get currentAttributes() {
    if (this.selectedProgram) {
      const attributes = this.selectedProgram.programTrackedEntityAttributes.map((a: any) => {
        const { trackedEntityAttribute, valueType } = a;
        return { ...trackedEntityAttribute, valueType, displayFormName: trackedEntityAttribute.name }

      });
      return [{ displayFormName: 'FIRST DATE OF UPCOMING SEASON', valueType: 'DATE', id: 'enrollmentDate' }, ...attributes]
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
      return this.selectedProgram.categoryCombo.categories.find((c: any) => c.id === 'wlEpNQNoR9F').categoryOptions.map((o: any) => {
        return {
          code: o.id,
          name: o.name
        }
      });
    }
    return []
  }

  @computed get eventModalForm() {
    return [{
      displayFormName: 'Date',
      valueType: 'DATE',
      id: 'eventDate'
    }]
    // , {
    //   displayFormName: 'Team Type',
    //   valueType: 'TEXT',
    //   id: 'wlEpNQNoR9F',
    //   optionSet: { options: this.currentTeamType }
    // }, {
    //   displayFormName: 'Team Name',
    //   valueType: 'TEXT',
    //   id: 'K1YcxEoSq1B',
    //   optionSet: { options: this.currentTeamName }
    // }
  }

  @computed get getTemplateData(): any {
    if (this.instance) {
      const enrollment = this.instance.enrollments[0];
      const { events } = enrollment;
      const e = events.find((event: any) => {
        return event.programStage === 'nNMTjdvTh7r'
      });
      if (e) {
        const { eventDate, dataValues, status, event } = e;
        // const aco = String(attributeCategoryOptions).split(';');
        const realValues = fromPairs(dataValues.map((dv: any) => {
          let value = dv.value;
          if (this.dateFields.indexOf(dv.dataElement) !== -1) {
            value = moment(value)
          }
          return [`${event}-${dv.dataElement}`, value]
        }));
        // const s1 = this.currentTeamType.map((x: any) => x.code).indexOf(aco[0]) !== -1 ? aco[0] : aco[1]
        // const s2 = this.currentTeamName.map((x: any) => x.code).indexOf(aco[0]) !== -1 ? aco[0] : aco[1]
        // return { ...realValues, [`${event}-eventDate`]: moment(eventDate), event, [`${event}-wlEpNQNoR9F`]: s1, [`${event}-K1YcxEoSq1B`]: s2, [`${event}-status`]: status }
        return { ...realValues, [`${event}-eventDate`]: moment(eventDate), event, [`${event}-status`]: status }
      }
      return {}
    }
    return {}
  }

  @computed get trueOnly() {
    if (this.currentProgramStageSections) {
      const all = this.currentProgramStageSections.map((section: any) => {
        return section.dataElements.filter((de: any) => {
          return de.valueType === 'TRUE_ONLY'
        }).map((x: any) => x.id)
      });

      return flatten(all);
    }

    return [];
  }

  @computed get disableRegister() {
    return !this.currentProgram || !this.selectedOrgUnit
  }

  @computed get currentSelectedOrganisation() {
    if (this.selectedProgram && this.selectedOrgUnit) {
      return this.selectedProgram.organisationUnits.find((ou: any) => ou.id === this.selectedOrgUnit)
    }
    return {};
  }

  @computed get currentDescendants() {
    if (this.descendants.length > 0 && this.teamType) {
      return this.descendants.filter((d: any) => d.description === this.teamType).map((d: any) => {
        return {
          name: d.name,
          code: d.name
        }
      })
    }

    return []
  }

}

export const store = new Store();