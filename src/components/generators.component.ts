import { API } from '@/shared/api'
import NttAccordion from '@/shared/components/ntt-accordion/ntt-accordion.component.vue'
import NttButton from '@/shared/components/ntt-button/ntt-button.component.vue'
import NttTextBox from '@/shared/components/ntt-textbox/ntt-textbox.component.vue'
import { ItemStepperDto } from '@/shared/dtos/item-stepper.dto'
// import { httpService } from '@/shared/services/http-client.service'
// import { messageService } from '@/shared/services/message-service'
// import { socketioService } from '@/shared/services/socketio.service'
import { NttString } from '@/shared/utils/ntt-string'
import { DxList, DxTextBox } from 'devextreme-vue'
import { Subscription } from 'rxjs/internal/Subscription'
import { Options, Vue } from 'vue-class-component'

@Options({
  components: { DxList, NttButton, NttTextBox, DxTextBox, NttAccordion }
})

export default class GeneratorsComponent extends Vue {

  subscription!: Subscription;

  generators: string[] = [];

  projectName: string = NttString.Empty;
  teamName: string = NttString.Empty;
  resetAccordion: number = 0;

  generatorSelected: string = NttString.Empty;

  stateStepper = false;
  stepsState = false;
  modules: string[] = [];
  openapi: any[] = [];
  steps:ItemStepperDto[] = [
    new ItemStepperDto({
      id: 1,
      title: 'Application type',
      state: false,
      multiple: false,
      list: ['Shell app for micro frontends', 'Aplication', 'Library components', 'API Client'],
      listSelected: [],
      required: true
    }), new ItemStepperDto({
      id: 2,
      title: 'Tecnology',
      state: false,
      multiple: false,
      list: ['Angular', 'React', 'Vue'],
      listSelected: [],
      required: true
    }), 
    new ItemStepperDto({
      id: 3,
      title: 'Modules',
      state: false,
      multiple: true,
      list: ['login segurity', 'internationalization', 'minimize images', 'icons pack', 'observability'],
      listSelected: [],
      required: false
    }), 
    new ItemStepperDto({
      id: 4,
      title: 'CI/CD',
      state: false,
      multiple: true,
      list: ['create repo', 'download zip'],
      listSelected: [],
      required: true
    }),
    new ItemStepperDto({
      id: 5,
      title: 'Open Api',
      state: false,
      multiple: true,
      list: [],
      listSelected: [],
      theme: 'openapi',
      data: [],
      required: false
    })];


  mounted() {
    this.getGeneratorsInfo();
    // this.subscription = socketioService.$zipFile.subscribe((msg: any) => {
    //   this.getZipFile(msg.filename);
    // });
  }

  unmounted() {
    // socketioService.destroySubject();
    this.subscription.unsubscribe();
  }

  beforeUnmount() {
    // socketioService.$zipFile.unsubscribe();
  }

  valueChanged(value: string) {
    this.stateStepper = this.projectName.length > 0 && this.stepsState;
  }

  dataSteps(steppers: ItemStepperDto[]) {
    const itemSelected = steppers[1]?.listSelected.toString().toLowerCase();
    this.generators.forEach((gen: string) => {
      if (gen.includes(itemSelected)) {
        this.generatorSelected = gen;
      }
    });
    this.modules = steppers[2]?.listSelected;
    this.openapi = steppers[4]?.data;
  }
  
  stateSteps(state: boolean) {
    this.stepsState = state;
    this.stateStepper = state && this.projectName.length > 0;
  }

  async getGeneratorsInfo() {
    // httpService.get(API.generators).then(result => {
    //   this.generators = result;
    // });
  }

  generatorClicked() {
    const body = {
      // socketUuid: socketioService.getSocketUuid(),
      options: {
        name: this.projectName,
        desc: this.teamName,
        template: this.generatorSelected,
        modules: this.modules,
        openapi: this.openapi.length > 0 ? this.openapi : null
      }
    }

    // httpService.post(API.generator, body).then(result => {
    //   messageService.toast('Generation finished'); 
    //   this.resetAccordion++;
    //   this.projectName = NttString.Empty;
    //   this.teamName = NttString.Empty;
    //   this.stateStepper = false;
    // });
  }
  
  async getZipFile(filename: any) {
    // console.log(filename);

    try {
      const response = await fetch(`http://localhost:5000/zipFile?filename=${filename}`, {
        method: 'get',
        headers: {
          'Accept': 'application/zip'
        }
      });
      const responseBody = await response.blob();
      // console.log(responseBody);

      // simular click para descarga
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(responseBody);
      anchor.target = '_blank';
      anchor.download = `${filename}.zip`;
      anchor.click();

    } catch (error) {
      console.log('Error! Could not reach the API. ', error);
      throw error;
    }
  }
}