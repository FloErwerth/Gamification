import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {Autocomplete, AutocompleteRenderInputParams, TextField} from "@mui/material";

interface IAutoComplete<T extends string[]> {
   options: T;
   onActivityChange: (value: T[number]) => void;
   label?: string;
   onInputChange?: (value: T[number]) => void;
   maxWidth?: number;
   freeSolo?: boolean;
   groupBy?: (option: T[number]) => string;
}

const cssClasses = getClasses(styles);

interface IAutocompleteItem extends AutocompleteRenderInputParams {
   label?: string;
}

const AutocompleteItem = (params: IAutocompleteItem) => {
   return <TextField {...params} label={params.label}/>
}

export function AutoComplete<T extends string[]>({
                                                    options,
                                                    onActivityChange,
                                                    label, onInputChange,
                                                    maxWidth = 200,
                                                    freeSolo = true,
                                                    groupBy,
                                                 }: IAutoComplete<T>) {
   return <Autocomplete groupBy={groupBy} freeSolo={freeSolo} sx={{maxWidth}} size={"small"}
                        onInputChange={(_, value) => onInputChange?.(value)}
                        options={options}
                        renderInput={(params) => <AutocompleteItem {...params} label={label}/>}
                        onChange={(_, value) => value && onActivityChange(value)}
   />
}