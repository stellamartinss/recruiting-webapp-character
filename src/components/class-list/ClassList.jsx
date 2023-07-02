import { CLASS_LIST } from '../../consts';
import { useState } from 'react';
import './ClassList.css';

const ClassList = ({ characterAttributes }) => {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClick = (className) => {
    setSelectedClass(className);
  };

  const cList = CLASS_LIST;

  return (
    <div>
      <h1>Main Objects</h1>
      <div>
        {Object.keys(CLASS_LIST).map((className) => {
          if(characterAttributes) {
            if (
              characterAttributes.strength >= cList[className].Strength &&
              characterAttributes.dexterity >= cList[className].Dexterity &&
              characterAttributes.constitution >= cList[className].Constitution &&
              characterAttributes.intelligence >= cList[className].Intelligence &&
              characterAttributes.wisdom >= cList[className].Wisdom &&
              characterAttributes.charisma >= cList[className].Charisma
            ) {
              cList[className].style = 'active';
            } else {
              cList[className].style = '';
            }
          }
          

          return (
            <span key={className}>
              <span
                onClick={() => handleClick(className)}
                className={CLASS_LIST[className].style}
              >
                {className}
              </span>
              <br />
            </span>
          );
        })}
      </div>
      {selectedClass && (
        <div>
          <h4>
            Minimun required for: <strong>{selectedClass}</strong>
          </h4>
          <div>
            {Object.entries(CLASS_LIST[selectedClass]).map(
              ([attribute, value]) => (
                <span key={attribute}>
                  <span>
                    {attribute}: {value}
                  </span>
                  <br />
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
