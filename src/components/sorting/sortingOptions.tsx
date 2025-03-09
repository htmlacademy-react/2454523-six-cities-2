import { SortType } from '../../const';
import { useState } from 'react';


const sortOptions = Object.values(SortType);

function SortingOptions () : JSX.Element{

  const [isOpenSortOptions, setIsOpenSortOptions] = useState(false);

  const handleSortClick = ()=> {
    setIsOpenSortOptions(!isOpenSortOptions);
  };


  return (
    <form className="places__sorting" action="#" method="get" >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}
        onClick = {handleSortClick}
      >
                  Popular
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className= {`places__options places__options--custom ${
        isOpenSortOptions ? 'places__options--opened' : ''
      }`}
      >

        {sortOptions.map((type)=> {
          const keyValue = type;
          return (
            <li key = {keyValue}
              className="places__option" tabIndex={0}
              onClick={handleSortClick}
            >
              {type}
            </li>
          );
        })}

      </ul>
    </form>
  );
}

export default SortingOptions;
