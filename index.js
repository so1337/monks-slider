// set max steps
const maxSteps = 9;
// set step background offset.
// maxSteps - 1 is because last step should go beyond background;
const backgroundStepSize = 100 / (maxSteps - 1);
// current step variable
let step = 0;


function hideElement(id) {
  document.getElementById(id).classList.remove('non-hidden');
  document.getElementById(id).classList.add('hidden');
}

function showElement(id) {
  document.getElementById(id).classList.add('non-hidden');
  document.getElementById(id).classList.remove('hidden');
}


function init() {
  // populate stepper
  for (let i = 0; i <= maxSteps; i++) {
    // clone index
    const index = Number(i);
    const btn = document.createElement('button');
    btn.className = 'step';
    btn.id = `step-${i}`;
    // edge steps don't have numbers
    btn.innerHTML = (i === maxSteps) || (i === 0) ? ' ' : index;
    btn.addEventListener('click', () => {
      changeStep(step, index, backgroundStepSize, maxSteps);
      step = index;
    });
    document.getElementById('steps').appendChild(btn);
  }

  // append current step-text near stepper
  const stepText = document.createElement('span');
  // on first step step-text is hidden
  stepText.className = 'step-text hidden';
  stepText.id = 'step-text';
  document.getElementById('steps').appendChild(stepText);

  // reset background position, select initial section
  document.getElementById('main').style.backgroundPosition = 0;
  showElement('section-0');
  document.getElementById('step-0').style.background = 'white';
  document.getElementById('main').style.display = 'none';
  // hide loader and show main block
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main').style = 'none';
  }, 2000);
}

// hide step-text and arrow controls on edge steps
function handleEdgeSteps(currentStep, lastIndex) {
  // reset visibility of items
  showElement('step-text');
  showElement('prev-btn');
  showElement('next-btn');

  // hide navigation and step-text if step is edge step.
  if (currentStep === lastIndex) {
    hideElement('step-text');
    hideElement('next-btn');
  }
  if (currentStep === 0) {
    hideElement('step-text');
    hideElement('prev-btn');
  }
}

// update elements according to selected step
function changeStep(currentStep, nextStep, stepSize, maxSteps) {
  // remove white background on current step
  document.getElementById(`step-${currentStep}`).style.background = '';
  // hide current step section with text
  hideElement(`section-${currentStep}`);
  // add white background on next selected step
  document.getElementById(`step-${nextStep}`).style.background = 'white';
  // show next step section with text
  showElement(`section-${nextStep}`);
  // move background on next step position
  document.getElementById('main').style.backgroundPosition = `${stepSize * nextStep}%`;
  // update step text
  document.getElementById('step-text').innerHTML = `Step ${nextStep} out of ${maxSteps - 1} on the path to digital enlightenment`;
  handleEdgeSteps(nextStep, maxSteps);
}


// handle "next" arrow button
document.getElementById('next-btn').addEventListener('click', () => {
  changeStep(step, step + 1, backgroundStepSize, maxSteps);
  step += 1;
});

// handle "prev" arrow button
document.getElementById('prev-btn').addEventListener('click', () => {
  changeStep(step, step - 1, backgroundStepSize, maxSteps);
  step -= 1;
});

init();
