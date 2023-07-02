import { SKILL_LIST } from '../../consts';
import React, { useState, useEffect } from 'react';

const Skills = ({ attributes, setCharacters, character }) => {
  const [pointsAvailable, setPointsAvailable] = useState(0);
  const [pointsRemaining, setPointsRemaining] = useState(0);
  const [skills, setSkills] = useState(
    SKILL_LIST.map((skill) => ({ ...skill, points: 0 }))
  );

  useEffect(() => {
    const result = 10 + 4 * attributes.intelligence;
    setPointsAvailable(result);
    setPointsRemaining(result);
  }, [attributes]);

  const incrementSkill = (skill) => {
    if (pointsRemaining > 0) {
      setSkills((prevSkills) =>
        prevSkills.map((prevSkill) => {
          if (prevSkill.name === skill.name) {
            const newSkill = { ...prevSkill };

            newSkill.points =
              character.skills && character.skills[skill.name]
                ? character.skills[skill.name]
                : newSkill.points;

            newSkill.points++;

            setPointsRemaining((prevSum) => prevSum - 1);
            return newSkill;
          }
          return prevSkill;
        })
      );
      
    } else {
      alert('0 skill points available!');
    }
  };

  const decrementSkill = (skill) => {
    if (skill.points > 0) {
      setSkills((prevSkills) =>
        prevSkills.map((prevSkill) => {
          if (prevSkill.name === skill.name) {
            const newSkill = { ...prevSkill };

            newSkill.points =
              character.skills && character.skills[skill.name]
                ? character.skills[skill.name]
                : newSkill.points;

            newSkill.points--;
            setPointsRemaining((prevSum) => prevSum + 1);
            return newSkill;
          }
          return prevSkill;
        })
      );
    }
  };

  const updateCharacterSkill = (characterId, newSkill, skillIndex) => {
    setCharacters((prevCaracters) => {
      return prevCaracters.map((character) => {
        if (character.id === characterId) {
          return {
            ...character,
            skills: {
              ...character.skills,
              [skills[skillIndex].name]: newSkill.points,
            },
          };
        }
        return character;
      });
    });

    console.log(character);
    console.log(skills);
  };

  const getTotalValue = (skill) => {
    const attributeValue = attributes[skill.attributeModifier.toLowerCase()];

    const total =
      attributes[skill.attributeModifier.toLowerCase()] - skill.points;

    return (
      <>
        {attributeValue} | total: {} {total}
      </>
    );
  };

  const getSkill = (skill) => {
    return (
      <>
        {skill.name}:{' '}
        {character.skills && character.skills[skill.name]
          ? character.skills[skill.name]
          : skill.points}{' '}
      </>
    );
  };

  return (
    <div>
      <h1>Skills</h1>

      <span>
        Total skill points available: {pointsRemaining}/{pointsAvailable}
      </span>
      <br />
      <br />
      <div>
        {skills.map((skill, index) => (
          <span key={index}>
            {getSkill(skill)}
            <button
              onClick={() => {
                incrementSkill(skill);
                updateCharacterSkill(character.id, skill, index);
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                decrementSkill(skill);
                updateCharacterSkill(character.id, skill, index);
              }}
            >
              -
            </button>{' '}
            - (Modifier:
            {skill.attributeModifier}): {getTotalValue(skill)}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
