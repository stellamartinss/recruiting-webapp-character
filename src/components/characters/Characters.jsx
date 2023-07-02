import React, { useState, useEffect } from 'react';
import Attributes from '../attributes/Attributes';
import ClassList from '../class-list/ClassList';
import Skills from '../skills/Skills';
import axios from 'axios';

const Characters = () => {
  const [id, setId] = useState(0);

  const [characterAttributes, setCharacterAttributes] = useState({
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  });

  const [attributes, setAttributes] = useState({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    debugger
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://recruiting.verylongdomaintotestwith.ca/api/stellamartinss/character'
        );
        setCharacters(response.data.body);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddCharacter = () => {
    const newCharacter = {
      id: characters[characters.length-1].id + 1,
      characterAttributes: { ...characterAttributes },
      attributes: { ...attributes },
    };
    setCharacters((prev) => [...prev, newCharacter]);

    setId((prevId) => prevId + 1);

    console.log(characters);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://recruiting.verylongdomaintotestwith.ca/api/stellamartinss/character',
        [
          {
              "id": 0,
              "characterAttributes": {
                  "strength": 14,
                  "dexterity": 10,
                  "constitution": 12,
                  "intelligence": 11,
                  "wisdom": 11,
                  "charisma": 11,
              },
              "attributes": {
                  "strength": 2,
                  "dexterity": 0,
                  "constitution": 1,
                  "intelligence": 0,
                  "wisdom": 0,
                  "charisma": 0,
              }
          },
          {
              "id": 1,
              "characterAttributes": {
                  "strength": 10,
                  "dexterity": 13,
                  "constitution": 10,
                  "intelligence": 15,
                  "wisdom": 10,
                  "charisma": 12
              },
              "attributes": {
                  "strength": 0,
                  "dexterity": 1,
                  "constitution": 0,
                  "intelligence": 2,
                  "wisdom": 0,
                  "charisma": 1
              }
          },
          {
              "id": 2,
              "characterAttributes": {
                  "strength": 10,
                  "dexterity": 10,
                  "constitution": 10,
                  "intelligence": 10,
                  "wisdom": 10,
                  "charisma": 14
              },
              "attributes": {
                  "strength": 0,
                  "dexterity": 0,
                  "constitution": 0,
                  "intelligence": 0,
                  "wisdom": 0,
                  "charisma": 2
              }
          },
          {
              "id": 3,
              "characterAttributes": {
                  "strength": 10,
                  "dexterity": 10,
                  "constitution": 10,
                  "intelligence": 14,
                  "wisdom": 13,
                  "charisma": 10,
              },
              "attributes": {
                  "strength": 0,
                  "dexterity": 0,
                  "constitution": 0,
                  "intelligence": 1,
                  "wisdom": 1,
                  "charisma": 0,
              }
          },
          {
              "id": 4,
              "characterAttributes": {
                  "strength": 10,
                  "dexterity": 10,
                  "constitution": 10,
                  "intelligence": 14,
                  "wisdom": 15,
                  "charisma": 13,
              },
              "attributes": {
                  "strength": 0,
                  "dexterity": 0,
                  "constitution": 0,
                  "intelligence": 1,
                  "wisdom": 2,
                  "charisma": 1
              }
          }
      ]
      );
      console.log('Post created:', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Coding Exercise</h1>
        <button onClick={handleAddCharacter}>New Character</button>
        <button onClick={handleSave}>Save Current Characters</button>
      </header>
      {characters && characters.map((item) => {
        debugger
        return (
          <section className='App-section' key={item.id}>
            <h1>Character # {item.id}</h1>
            <div className='container'>
              <div className='col-4'>
                <Attributes
                  character={item}
                  characters={characters}
                  setCharacters={setCharacters}
                />
              </div>
              <div className='col-4'>
                <ClassList characterAttributes={item.characterAttributes} /> 
              </div>
              <div className='col-4'>
                <Skills
                  characterAttributes={item.characterAttributes} 
                  attributes={item.attributes}
                  setAttributes={setAttributes}
                />
              </div>
            </div>
            <hr />
          </section>
        );
      })}
    </div>
  );
};

export default Characters;
