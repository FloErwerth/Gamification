import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {Autocomplete, AutocompleteRenderInputParams, TextField} from "@mui/material";

interface IAutoComplete<Options extends string[]> {
   options: Options;
   onChosenOption: (value: Options[number]) => void;
   label?: string;
   onInputChange?: (value: string) => void;
   maxWidth?: number
}

const cssClasses = getClasses(styles);

interface IAutocompleteItem extends AutocompleteRenderInputParams {
   label?: string;
}

const AutocompleteItem = (params: IAutocompleteItem) => {
   return <TextField {...params} label={params.label}/>
}

export function AutoComplete<Options extends string[]>({
                                                          options,
                                                          onChosenOption,
                                                          label, onInputChange,
                                                          maxWidth = 200,
                                                       }: IAutoComplete<Options>) {
   return <Autocomplete sx={{maxWidth}} size={"small"} onInputChange={(_, value) => onInputChange?.(value)}
                        options={options}
                        renderInput={(params) => <AutocompleteItem {...params} label={label}/>}
                        onChange={(_, value) => value && onChosenOption(value)}
   />
}