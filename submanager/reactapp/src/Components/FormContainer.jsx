import { useContext } from 'react';
import { DataContext } from '../Contexts/DataContext';
import SubName from './SubName';
import Cost from './Cost';
import Category from './Category';
import Frequency from './Frequency';
import Notes from './Notes';
import Paid from './Paid';
import File from './File';
import Button from './Button';
import Table from './Table';

function FormContainer() {
  const { handleSubmit } = useContext(DataContext);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        id="subForm"
        className="d-flex flex-column gap-3 mb-4"
      >
        <SubName />
        <Cost />
        <Category />
        <Frequency />
        <Notes />
        <Paid />
        <File />
        <Button />
      </form>
      <Table />
    </div>
  );
}

export default FormContainer;
