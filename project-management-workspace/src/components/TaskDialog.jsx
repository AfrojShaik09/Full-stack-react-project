import { useState } from 'react';
import { X } from 'lucide-react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';
import { currentUser, projects } from '../data/workspaceConfig.js';
import { IconButton } from './Primitives.jsx';

const Backdrop = styled.div`
  position: fixed;
  z-index: 30;
  inset: 0;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.sizes.space[4]};
  background: ${({ theme }) => theme.colors.overlayDialog};
`;
const Dialog = styled.form`
  width: min(100%, 470px);
  padding: ${({ theme }) => theme.sizes.space[6]};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.sizes.radius.xl};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  h2 {
    margin: 0;
    font-size: 19px;
  }
  p {
    margin: 5px 0 0;
    color: ${({ theme }) => theme.colors.inkMuted};
    font-size: 12px;
  }
`;
const Label = styled.label`
  display: grid;
  gap: 7px;
  margin-top: 14px;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 11px;
  font-weight: 700;
`;
const Input = styled.input`
  min-height: ${({ theme }) => theme.sizes.control.field};
  padding: 0 ${({ theme }) => theme.sizes.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.lineStrong};
  border-radius: ${({ theme }) => theme.sizes.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 13px;
`;
const Select = styled.select`
  min-height: ${({ theme }) => theme.sizes.control.field};
  padding: 0 ${({ theme }) => theme.sizes.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.lineStrong};
  border-radius: ${({ theme }) => theme.sizes.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 13px;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 23px;
`;

export default function TaskDialog({ onClose, onSubmit, activeProjectId }) {
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState(
    activeProjectId === 'all' ? 'project-product' : activeProjectId,
  );
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('2026-10-12');

  function submit(event) {
    event.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      projectId,
      priority,
      dueDate,
      status: 'todo',
      assignee: currentUser.name,
      initials: currentUser.initials,
      tags: ['New'],
    });
    onClose();
  }

  return (
    <Backdrop
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <Dialog role="dialog" aria-modal="true" aria-labelledby="new-task-title" onSubmit={submit}>
        <Header>
          <div>
            <h2 id="new-task-title">Create a task</h2>
            <p>Add the next step for your team.</p>
          </div>
          <Tooltip title="Close task form">
            <IconButton type="button" aria-label="Close dialog" onClick={onClose}>
              <X size={17} />
            </IconButton>
          </Tooltip>
        </Header>
        <Label>
          Task name
          <Input
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Review the project brief"
            required
            maxLength={90}
          />
        </Label>
        <Row>
          <Label>
            Project
            <Select value={projectId} onChange={(event) => setProjectId(event.target.value)}>
              {projects.slice(1).map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </Select>
          </Label>
          <Label>
            Priority
            <Select value={priority} onChange={(event) => setPriority(event.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </Label>
        </Row>
        <Label>
          Due date
          <Input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
        </Label>
        <Actions>
          <Button type="button" variant="text" color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Create task
          </Button>
        </Actions>
      </Dialog>
    </Backdrop>
  );
}
