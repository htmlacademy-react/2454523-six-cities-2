/* eslint-disable react-refresh/only-export-components */
import { SortType } from '../../const';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getSortType } from '../../store/filters/filters-selectors';
import { memo } from 'react';

type SortingOptionsProps = {
  onSortTypeClick: (city: string) => void;
}


const sortOptions = Object.values(SortType);

function SortingOptions ({onSortTypeClick}: SortingOptionsProps) : JSX.Element{

  const currentSortType = useAppSelector(getSortType);

  const [isOpenSortOptions, setIsOpenSortOptions] = useState(false);

  const handleSortOptionsToggleClick = ()=> {
    setIsOpenSortOptions(!isOpenSortOptions);
  };


  return (
    <form className="places__sorting" action="#" method="get" >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}
        onClick = {handleSortOptionsToggleClick}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className= {`places__options places__options--custom ${
        isOpenSortOptions ? 'places__options--opened' : ''
      }`}
      >

        {sortOptions.map((type)=>
          (
            <li key = {type}
              className="places__option" tabIndex={0}
              onClick={()=> {
                onSortTypeClick(type);
                handleSortOptionsToggleClick();
              }}
            >
              {type}
            </li>
          )
        )}

      </ul>
    </form>
  );
}

export default memo(SortingOptions);
