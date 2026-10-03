import { Bell, ChevronDown, Menu, Moon, Plus, Search, Sun } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';
import { currentUser } from '../data/workspaceConfig.js';
import { ActionButton, Avatar, Field, IconButton } from './Primitives.jsx';

const Bar = styled.header`
  display: flex;
  align-items: center;
  gap: 13px;
  min-height: 76px;
  padding: 0 35px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.surface};
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.tablet}) {
    padding: 0 22px;
  }
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    min-height: 64px;
    padding: 0 14px;
    gap: 8px;
  }
`;
const MenuButton = styled(IconButton)`
  display: none;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.tablet}) {
    display: inline-grid;
  }
`;
const SearchWrap = styled.label`
  position: relative;
  width: min(320px, 36vw);
  margin-right: auto;
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.inkFaint};
  }
  input {
    padding-left: 37px;
  }
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.content}) {
    width: auto;
    flex: 1;
  }
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.search}) {
    input {
      width: 38px;
      padding: 0;
      color: transparent;
      background: transparent;
      border-color: transparent;
    }
    input:focus {
      position: absolute;
      z-index: 5;
      right: 0;
      width: min(250px, 70vw);
      padding-left: 37px;
      color: ${({ theme }) => theme.colors.ink};
      background: ${({ theme }) => theme.colors.surface};
      border-color: ${({ theme }) => theme.colors.lineStrong};
    }
  }
`;
const SearchField = styled(Field)`
  min-height: 39px;
  padding-left: 37px;
  border-color: ${({ theme }) => theme.colors.line};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  font-size: 12px;
`;
const Divider = styled.span`
  width: 1px;
  height: 27px;
  background: ${({ theme }) => theme.colors.line};
  margin: 0 2px;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    display: none;
  }
`;
const User = styled.button`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  small {
    display: block;
    color: ${({ theme }) => theme.colors.inkMuted};
    text-align: left;
    font-size: 10px;
  }
  strong {
    display: block;
    color: ${({ theme }) => theme.colors.ink};
    text-align: left;
    font-size: 11px;
  }
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.account}) {
    span,
    svg {
      display: none;
    }
  }
`;
const AddButton = styled(ActionButton)`
  flex: 0 0 auto;
  white-space: nowrap;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    min-height: 38px;
    width: 38px;
    padding: 0;
    span {
      display: none;
    }
  }
`;

export default function Topbar({ search, onSearch, onCreate, dark, onToggleTheme, onOpenMenu }) {
  return (
    <Bar>
      <MenuButton aria-label="Open navigation" title="Open navigation" onClick={onOpenMenu}>
        <Menu size={18} />
      </MenuButton>
      <SearchWrap>
        <Search size={16} />
        <SearchField
          aria-label="Search tasks"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search anything..."
        />
      </SearchWrap>
      <IconButton
        aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        onClick={onToggleTheme}
      >
        {dark ? <Sun size={17} /> : <Moon size={17} />}
      </IconButton>
      <Tooltip title="Notifications">
        <IconButton aria-label="Notifications">
          <Bell size={17} />
        </IconButton>
      </Tooltip>
      <Divider />
      <User type="button" aria-label={`${currentUser.name} account`}>
        <Avatar $color="accent">{currentUser.initials}</Avatar>
        <span>
          <strong>{currentUser.name}</strong>
          <small>{currentUser.role}</small>
        </span>
        <ChevronDown size={14} color="currentColor" />
      </User>
      <AddButton aria-label="Create a new task" onClick={onCreate}>
        <Plus size={16} />
        <span>New task</span>
      </AddButton>
    </Bar>
  );
}
