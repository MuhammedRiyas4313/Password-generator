function Checkbox({ value, onChange }) {
    

  return (
    <div>
      <input type="checkbox" checked={value} onChange={onChange} />
    </div>
  );
}

export default Checkbox;
