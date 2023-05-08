import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {Autocomplete, AutocompleteRenderInputParams, TextField} from "@mui/material";

interface IAutoComplete {
   options: string[];
   onActivityChange: (value: string) => void;
   label?: string;
   onInputChange?: (value: string) => void;
   maxWidth?: number;
   freeSolo?: boolean;
}

const cssClasses = getClasses(styles);

interface IAutocompleteItem extends AutocompleteRenderInputParams {
   label?: string;
}

const AutocompleteItem = (params: IAutocompleteItem) => {
   return <TextField {...params} label={params.label}/>
}

export function AutoComplete({
                                options,
                                onActivityChange,
                                label, onInputChange,
                                maxWidth = 200,
                                freeSolo = true
                             }: IAutoComplete) {
   return <Autocomplete freeSolo={freeSolo} sx={{maxWidth}} size={"small"}
                        onInputChange={(_, value) => onInputChange?.(value)}
                        options={options}
                        renderInput={(params) => <AutocompleteItem {...params} label={label}/>}
                        onChange={(_, value) => value && onActivityChange(value)}
   />
}