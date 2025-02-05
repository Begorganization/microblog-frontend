import Rox from 'rox-browser';

const flags = {
  enableTutorial: new Rox.Flag(),
  titleColors: new Rox.RoxString('White', ['White', 'Blue', 'Green', 'Yellow']),
  titleSize: new Rox.RoxNumber(12, [14, 18, 24])
};

async function initPlatform() {
  const options = {  };

  // Register the flags
  Rox.register('', flags);

  // Setup connection with the feature management environment key
  await Rox.setup('2bb4c014-186c-44c9-8ed0-452601698214', options);

  // Boolean flag example
  if (flags.enableTutorial.isEnabled()) {
    console.log('enableTutorial flag is true');
    // TODO:  Put your code here that needs to be gated
  }

   // RoxString flag example
  console.log('Title color is ' + flags.titleColors.getValue());

  // RoxNumber flag example
  console.log('Title size is ' + flags.titleSize.getValue());
}

initPlatform().then(function() {
  console.log('Done loading CloudBees platform');
});


import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
