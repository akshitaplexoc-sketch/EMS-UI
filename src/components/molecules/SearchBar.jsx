import { Search } from "lucide-react";
import Input from "../atoms/Input";

function SearchBar({
    value,
    onChange,
    placeholder = "Search...",
    style = {}
}) {
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                ...style
            }}
        >
            <Search
                size={18}
                style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94A3B8",
                    pointerEvents: "none",
                    zIndex: 1
                }}
            />

            <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    paddingLeft: "42px"
                }}
            />
        </div>
    );
}

export default SearchBar;