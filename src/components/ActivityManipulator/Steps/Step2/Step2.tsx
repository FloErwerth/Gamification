import React, {useCallback, useContext, useState} from "react";
import {ActivityCategory, MapCategoryToStats, TActivityCategory} from "../../../../activitiesAssembly/categories";
import {AutoComplete} from "../../../AutocompleteItem/AutoComplete";
import {SelectableField} from "../../../SelectableField/SelectableField";
import {getDefaultStats, Stat} from "../../../../activitiesAssembly/stats";
import {getClasses} from "../../../../utils/styleUtils";
import {styles} from "./styles";
import {EditStat} from "../../Components/EditStat/EditStat";
import {usePropsFilter} from "../../../../utils/usePropsFilter";
import {Input} from "../../../Input/Input";
import {ActivityManipulatorContext} from "../../ActivityManipulatorContext/ActivityManipulatorContext";
import {
   DeleteableAndEditableChip
} from "../../Components/DisplayedChips/DeleteableAndEditableChip/DeleteableAndEditableChip";
import {DeleteableChip} from "../../Components/DisplayedChips/DeleteableChip/DeleteableChip";
import {getUnitOptions} from "../../../../activitiesAssembly/units";

const useAvailableFields = (filter: TActivityCategory, alreadyAdded: Stat[] | undefined) => {
   const availableStats = getDefaultStats(MapCategoryToStats(filter).options.filter((option) => !alreadyAdded?.find((stat) => stat.statName === option)));
   const {filteredArray, setFilter} = usePropsFilter(availableStats, "statName");
   return {
      setStatFilter: setFilter,
      availableStats: filteredArray,
   }
}

const cssClasses = getClasses(styles);
export const Step2 = () => {

   const {
      stats,
      editStat,
      handleSetAdditionalStats,
      handleStatDeletion,
      handleStatEdit,
       withState
   } = useContext(ActivityManipulatorContext);

   const [categoryFilter, setCategoryFilter] = useState<TActivityCategory>("All");
   const {
      setStatFilter,
      availableStats
   } = useAvailableFields(categoryFilter, stats);

   const renderChip = useCallback((stat: Stat) => {
      if(withState) {
         return <DeleteableChip onDeletion={handleStatDeletion} stat={stat} />
      } else {
         const unitOptions = getUnitOptions(stat.statName);
         if(unitOptions) {
            return <DeleteableAndEditableChip key={`ActivityManipulatorStep2Stat${stat.statName}`}
                                              onDeletion={handleStatDeletion}
                                              onEdit={handleStatEdit} stat={stat}
            />
         } else {
            return <DeleteableChip onDeletion={handleStatDeletion} stat={stat} />
         }
      }
   }, [handleStatDeletion, handleStatEdit, withState])

   return <div className={cssClasses.selectorWrapper}>
      {editStat ? <EditStat/> :
         <>
            <div className={cssClasses.buttons}><AutoComplete freeSolo={true} label={"Category"}
                                                              options={ActivityCategory.options}
                                                              onInputChange={(value) => !value && setCategoryFilter("All")}
                                                              onActivityChange={(category) => {
                                                                 setCategoryFilter(category)
                                                              }}/><Input label="Filter stats" type="text"
                                                                         onChange={(e) => setStatFilter(e)}></Input>
            </div>
            <>
               {availableStats.length > 0 && <small className={cssClasses.info}>Available stats</small>}
               <div className={cssClasses.selectedStats}>
                  {availableStats.map((field) =>
                     <SelectableField key={`ActivityManipulatorStep2FieldFor${field.statName}`} selectableStat={field}
                                      onClick={(stat) => handleSetAdditionalStats?.(stat)}/>)}
               </div>
            </>
            <>
               {stats && stats.length > 0 && <small className={cssClasses.info}>Selected stats</small>}
               <div className={cssClasses.selectedStats}>
                  {stats?.map((field) => renderChip(field))}
               </div>
            </>
         </>}
   </div>
}
