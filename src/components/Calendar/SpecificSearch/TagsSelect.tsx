import { SyntheticEvent } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { allTags } from "./constants";

export interface ITagsSelectProps {
  selectedTags: string[];
  setSelectedTags: (newTags: string[]) => void;
}

export const TagsSelect = ({
  selectedTags,
  setSelectedTags,
}: ITagsSelectProps) => {
  const onChange = (_: SyntheticEvent<Element, Event>, value: string[]) => {
    setSelectedTags(value);
  };

  return (
    <Autocomplete
      multiple
      id="tags"
      options={allTags}
      getOptionLabel={(option: string) => option}
      value={selectedTags}
      onChange={onChange}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="Event Tags" />
      )}
    />
  );
};
