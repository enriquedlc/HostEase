import { TextField } from "@mui/material";
import { useState } from "react";

import './SearchBar.css';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar = (props: SearchBarProps) => {

    const { onSearch } = props;

    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = (event: any) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
        />
    );
};

export default SearchBar;
