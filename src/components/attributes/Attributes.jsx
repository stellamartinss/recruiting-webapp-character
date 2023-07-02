import React, { useState } from 'react';

const Attributes = ({ character, setCharacters }) => {
  const [strength, setStrength] = useState(
    character ? character.characterAttributes.strength : 10
  );
  const [dexterity, setDexterity] = useState(
    character ? character.characterAttributes.dexterity : 10
  );
  const [constitution, setConstitution] = useState(
    character ? character.characterAttributes.constitution : 10
  );
  const [intelligence, setIntelligence] = useState(
    character ? character.characterAttributes.intelligence : 10
  );
  const [wisdom, setWisdom] = useState(
    character ? character.characterAttributes.wisdom : 10
  );
  const [charisma, setCharisma] = useState(
    character ? character.characterAttributes.charisma : 10
  );
  const [totalSum, setTotalSum] = useState(0);

  const min = 0;
  const max = 20;

  const decreaseAttribute = (hability) => {
    const result = hability > min ? hability - 1 : hability;
    return result;
  };

  const increaseAttribute = (hability) => {
    const result = hability < max ? hability + 1 : hability;
    return result;
  };

  function getAttributeModifier(attribute) {
    let modifier;
    modifier = Math.floor((attribute - 10) / 2);
    return modifier;
  }

  const updateCharacterAttribute = (
    characterId,
    newStrength,
    modifier,
    attributeName
  ) => {
    setCharacters((prevCaracters) => {
      return prevCaracters.map((character) => {
        if (character.id === characterId) {
          return {
            ...character,
            characterAttributes: {
              ...character.characterAttributes,
              [attributeName]: newStrength,
            },
            attributes: {
              ...character.attributes,
              [attributeName]: modifier,
            },
          };
        }
        return character;
      });
    });
  };

  const isMaxSum = (atributes) => {
    const values = Object.values(atributes);
    const sum = values.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setTotalSum(sum);
    const isMax = sum >= 70 ? true : false;

    if (isMax) {
      alert('70 reached!');
    }
    return isMax;
  };

  const incrementStrength = () => {
    if (isMaxSum(character.characterAttributes)) {
      return;
    }

    setStrength((prevStrength) => {
      const newStrength = increaseAttribute(prevStrength);
      const modifier = getAttributeModifier(newStrength);
      updateCharacterAttribute(character.id, newStrength, modifier, 'strength');
      return newStrength;
    });
  };

  const decrementStrength = () => {
    setStrength((prevStrength) => {
      const newStrength = decreaseAttribute(prevStrength);
      const modifier = getAttributeModifier(newStrength);
      updateCharacterAttribute(character.id, newStrength, modifier, 'strength');
      return newStrength;
    });
  };

  const incrementDexterity = () => {
    if (isMaxSum(character.characterAttributes)) {
      return;
    }

    setDexterity((prevDexterity) => {
      const newDexterity = increaseAttribute(prevDexterity);
      const modifier = getAttributeModifier(newDexterity);
      updateCharacterAttribute(
        character.id,
        newDexterity,
        modifier,
        'dexterity'
      );
      return newDexterity;
    });
  };

  const decrementDexterity = () => {
    setDexterity((prevDexterity) => {
      const newDexterity = decreaseAttribute(prevDexterity);
      const modifier = getAttributeModifier(newDexterity);
      updateCharacterAttribute(
        character.id,
        newDexterity,
        modifier,
        'dexterity'
      );
      return newDexterity;
    });
  };

  const incrementConstitution = () => {
    if (isMaxSum(character.characterAttributes)) {
      return;
    }

    setConstitution((prevConstitution) => {
      const newConstitution = increaseAttribute(prevConstitution);
      const modifier = getAttributeModifier(newConstitution);
      updateCharacterAttribute(
        character.id,
        newConstitution,
        modifier,
        'constitution'
      );
      return newConstitution;
    });
  };

  const decrementConstitution = () => {
    setConstitution((prevConstitution) => {
      const newConstitution = decreaseAttribute(prevConstitution);
      const modifier = getAttributeModifier(newConstitution);
      updateCharacterAttribute(
        character.id,
        newConstitution,
        modifier,
        'constitution'
      );
      return newConstitution;
    });
  };

  const incrementIntelligence = () => {
    if (isMaxSum(character.characterAttributes)) {
      return;
    }

    setIntelligence((prevIntelligence) => {
      const newIntelligence = increaseAttribute(prevIntelligence);
      const modifier = getAttributeModifier(newIntelligence);
      updateCharacterAttribute(
        character.id,
        newIntelligence,
        modifier,
        'intelligence'
      );
      return newIntelligence;
    });
  };

  const decrementIntelligence = () => {
    setIntelligence((prevIntelligence) => {
      const newIntelligence = decreaseAttribute(prevIntelligence);
      const modifier = getAttributeModifier(newIntelligence);
      updateCharacterAttribute(
        character.id,
        newIntelligence,
        modifier,
        'intelligence'
      );
      return newIntelligence;
    });
  };

  const incrementWisdom = () => {
    if (isMaxSum(character.characterAttributes)) {
      return;
    }

    setWisdom((prevWisdom) => {
      const newWisdom = increaseAttribute(prevWisdom);
      const modifier = getAttributeModifier(newWisdom);
      updateCharacterAttribute(character.id, newWisdom, modifier, 'wisdom');
      return newWisdom;
    });
  };

  const decrementWisdom = () => {
    setWisdom((prevWisdom) => {
      const newWisdom = decreaseAttribute(prevWisdom);
      const modifier = getAttributeModifier(newWisdom);
      updateCharacterAttribute(character.id, newWisdom, modifier, 'wisdom');
      return newWisdom;
    });
  };

  const incrementCharisma = () => {
    if (isMaxSum(character.characterAttributes)) {
      return;
    }

    setCharisma((prevCharisma) => {
      const newCharisma = increaseAttribute(prevCharisma);
      const modifier = getAttributeModifier(newCharisma);
      updateCharacterAttribute(character.id, newCharisma, modifier, 'charisma');
      return newCharisma;
    });
  };

  const decrementCharisma = () => {
    setCharisma((prevCharisma) => {
      const newCharisma = decreaseAttribute(prevCharisma);
      const modifier = getAttributeModifier(newCharisma);
      updateCharacterAttribute(character.id, newCharisma, modifier, 'charisma');
      return newCharisma;
    });
  };

  return (
    <div>
      <h2>Attributes</h2>
      <div>
        <label>Strength:</label>
        <span>{character.characterAttributes.strength}</span>
        <span>(Modifier: {character.attributes.strength})</span>
        <button onClick={incrementStrength}>+</button>
        <button onClick={decrementStrength}>-</button>
      </div>
      <div>
        <label>Dexterity:</label>
        <span>{character.characterAttributes.dexterity}</span>
        <span>(Modifier: {character.attributes.dexterity})</span>
        <button onClick={incrementDexterity}>+</button>
        <button onClick={decrementDexterity}>-</button>
      </div>
      <div>
        <label>Constitution:</label>
        <span>{character.characterAttributes.constitution}</span>
        <span>(Modifier: {character.attributes.constitution})</span>
        <button onClick={incrementConstitution}>+</button>
        <button onClick={decrementConstitution}>-</button>
      </div>
      <div>
        <label>Intelligence:</label>
        <span>{character.characterAttributes.intelligence}</span>
        <span>(Modifier: {character.attributes.intelligence})</span>
        <button onClick={incrementIntelligence}>+</button>
        <button onClick={decrementIntelligence}>-</button>
      </div>
      <div>
        <label>Wisdom:</label>
        <span>{character.characterAttributes.wisdom}</span>
        <span>(Modifier: {character.attributes.wisdom})</span>
        <button onClick={incrementWisdom}>+</button>
        <button onClick={decrementWisdom}>-</button>
      </div>
      <div>
        <label>Charisma:</label>
        <span>{character.characterAttributes.charisma}</span>
        <span>(Modifier: {character.attributes.charisma})</span>
        <button onClick={incrementCharisma}>+</button>
        <button onClick={decrementCharisma}>-</button>
      </div>
    </div>
  );
};

export default Attributes;
