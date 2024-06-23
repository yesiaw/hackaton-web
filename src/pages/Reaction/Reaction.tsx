import { DatabaseCard } from './ui/DatabaseCard';
import { useState } from 'react';
import ReactionTable from './ui/Table/ReactionTable.tsx';

const Reaction = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <DatabaseCard onChange={() => setOpen(true)} />
            {open && <ReactionTable />}
        </div>
    );
};

export default Reaction;
