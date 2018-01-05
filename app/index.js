window.addEventListener('DOMContentLoaded', () => {
  let elPath1 = document.querySelector('div.tp1');
  let elPath2 = document.querySelector('div.tp2');
  let elPointsSpent = document.getElementById('pointsSpent');
  let elMainNavItems = document.querySelectorAll('.site-container > header > nav > ul > li');

  elMainNavItems.forEach((navItem) => {
    let elSubNav = navItem.querySelector('.subnav'); 
    if (elSubNav) {
      navItem.addEventListener('mouseenter', (e) => {
        elSubNav.style.display = 'flex';
      });
      elSubNav.addEventListener('mouseleave', (event) => {
        event.currentTarget.style.display = 'none';
      });
    }
  });
  let pointsSpent = 0;
  let addedSkills = [];
  let skillPrerequisites = {
    stacks: null,
    eat: 'stacks',
    cake: 'eat',
    king: 'cake',
    ship: null,
    scuba: 'ship',
    bolt: 'scuba',
    skull: 'bolt'
  };
  let skillChildren = {
    stacks: ['eat', 'cake', 'king'],
    eat: ['cake', 'king'],
    cake: ['king'],
    king: null,
    ship: ['scuba', 'bolt', 'skull'],
    scuba: ['bolt', 'skull'],
    bolt: ['skull'],
    skull: null
  } 

  elPath1.addEventListener('click', pathClick);
  elPath2.addEventListener('click', pathClick);

  function pathClick (e) {
    let skill = e.target.id;
    if (addedSkills.includes(skill)) {
      removeSkill(skill);
    } else {
      addSkill(skill);
    }
  }

  function addSkill(skill) {
    if (pointsSpent < 6 && checkPrerequisites(skill)) {
      addedSkills.push(skill);
      updatePoints(1);
      updateDom(skill);
    }
  }

  function removeSkill(skill) {
    if (!isChildSkillSelected(skill)) {
      let index = addedSkills.indexOf(skill);
      if (index > -1) {
        addedSkills.splice(index, 1);
      }
      updatePoints(-1);
      updateDom(skill);
    }
  }

  function checkPrerequisites(skill) {
    if (skillPrerequisites[skill] === null || addedSkills.includes(skillPrerequisites[skill])) {
      return true;
    } else {
      return false;
    }
  }

  function isChildSkillSelected(skill) {
    if (skillChildren[skill] == null) {
      return false;
    } else {
      let isChildSkillSelected = false;
      skillChildren[skill].forEach((child) => {
        if (addedSkills.includes(child)) {
          isChildSkillSelected = true;
        }
      });
      return isChildSkillSelected;
    }
  }

  function updatePoints(num) {
    pointsSpent += num;
    elPointsSpent.textContent = `${pointsSpent} / 6`;
  }

  function updateDom(skill) {
    let elSkill = document.getElementById(skill).parentElement;
    let elConnector = elSkill.previousElementSibling;
    if (elConnector) {
      elConnector.classList.toggle('selected');
    }
    elSkill.classList.toggle('selected');

  }

}, false);