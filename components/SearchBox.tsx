type SearchBoxProps = {
  placeholder?: string;
  defaultValue?: string;
  action: string;
};

export default function SearchBox({ placeholder = "輸入關鍵字...", defaultValue = "", action }: SearchBoxProps) {
  return (
    <form className="search-box" action={action} method="get">
      <input type="text" name="q" className="search-input" placeholder={placeholder} defaultValue={defaultValue} />
      <button type="submit" className="search-btn">
        🔍
      </button>
    </form>
  );
}
