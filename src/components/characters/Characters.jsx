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
      id: characters[characters.length - 1].id + 1,
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
        characters
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
      {characters &&
        characters.map((item) => {
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
                <div className='col-2'>
                  <ClassList characterAttributes={item.characterAttributes} />
                </div>
                <div className='col-4'>
                  <Skills
                    character={item}
                    setCharacters={setCharacters}
                    attributes={item.attributes}
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
