
const Filter = ({ search, onChangeHandler }) => {
    return (
      <>
        Filter shown with <input value={search} onChange={onChangeHandler} />
      </>
    );
  };

export default Filter