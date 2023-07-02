import { SKILL_LIST } from '../../consts';
import React, { useState, useEffect } from 'react';

const Skills = ({ characterAttributes, attributes, setAttributes }) => {
  const [sum, setSum] = useState(0);
  const [skills, setSkills] = useState(SKILL_LIST)

  useEffect(() => {
    let totalSum = 0;
    SKILL_LIST.forEach((skill) => {
      totalSum += attributes[skill.attributeModifier.toLowerCase()];
    });
    setSum(totalSum);
  }, [attributes]);

  return ( 
    <div>
      <h1>Skills</h1>

      <span>Total skill points available: {sum}</span>
      <br />
      <br />
      <div>
        {skills.map((skill, index) => (
          <span key={index}>
            {skill.name}: {} - (Modifier: {skill.attributeModifier}): {attributes[skill.attributeModifier.toLowerCase()]}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;