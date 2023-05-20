import {Autocomplete, AutocompleteRenderInputParams, TextField} from "@mui/material";

interface IAutoComplete<T extends string[]> {
   options: T;
   onActivityChange: (value: T[number]) => void;
   label?: string;
   onInputChange?: (value: T[number]) => void;
   width?: number;
   freeSolo?: boolean;
   groupBy?: (option: T[number]) => string;
   value?: string;
}

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
                                                    width = 200,
                                                    freeSolo = true,
                                                    groupBy, value
                                                 }: IAutoComplete<T>) {
   return <Autocomplete value={value} groupBy={groupBy} freeSolo={freeSolo} sx={{width: width}} size={"small"}
                        onInputChange={(_, value) => onInputChange?.(value)}
                        options={options}
                        renderInput={(params) => <AutocompleteItem {...params}
                                                                   label={label}/>}
                        onChange={(_, value) => value && onActivityChange(value)}
   />
}