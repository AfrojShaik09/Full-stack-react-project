import { useState } from 'react';
import {
  CalendarDays,
  ChevronDown,
  CircleHelp,
  Command,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Settings2,
  Sparkles,
} from 'lucide-react';
import styled from 'styled-components';
import { currentUser, projects } from '../data/workspaceConfig.js';
import { Avatar } from './Primitives.jsx';

const Rail = styled.aside`
  width: 244px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 23px 15px 17px;
  border-right: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.surface};
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.tablet}) {
    position: fixed;
    z-index: 20;
    inset: 0 auto 0 0;
    width: min(290px, calc(100vw - 44px));
    min-height: 100dvh;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    transform: translateX(${({ $open }) => ($open ? '0' : '-105%')});
    transition: transform 180ms ease;
  }
`;
const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px 26px;
`;
const BrandMark = styled.span`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
`;
const BrandName = styled.strong`
  font-size: 17px;
  letter-spacing: 0;
`;
const WorkspacePicker = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  padding: 10px 9px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 11px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  text-align: left;
  cursor: pointer;
`;
const WorkspaceBadge = styled.span`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.goldSoft};
  color: ${({ theme }) => theme.colors.gold};
  font-size: 12px;
  font-weight: 800;
`;
const WorkspaceText = styled.span`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  strong {
    font-size: 12px;
  }
  small {
    color: ${({ theme }) => theme.colors.inkMuted};
    font-size: 11px;
  }
`;
const NavSection = styled.div`
  margin-top: 27px;
`;
const SectionLabel = styled.div`
  padding: 0 9px 9px;
  color: ${({ theme }) => theme.colors.inkFaint};
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;
const NavItem = styled.button`
  width: 100%;
  min-height: 38px;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 10px;
  border: 0;
  border-radius: 9px;
  background: ${({ $active, theme }) => ($active ? theme.colors.accentSoft : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.inkMuted)};
  text-align: left;
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? 700 : 550)};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.ink};
  }
`;
const ProjectDot = styled.i`
  width: 9px;
  height: 9px;
  border-radius: 3px;
  background: ${({ $tone, theme }) => theme.colors[$tone]};
`;
const Counter = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.inkFaint};
  font-size: 11px;
`;
const Bottom = styled.div`
  margin-top: auto;
  padding-top: 20px;
`;
const HelpButton = styled(NavItem)`
  margin-top: 2px;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 18px 8px 0;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
`;
const ExpandIcon = styled(ChevronDown)`
  margin-left: auto;
  transform: rotate(${({ $expanded }) => ($expanded ? '0deg' : '-90deg')});
  transition: transform 140ms ease;
`;
const Overlay = styled.button`
  display: none;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.tablet}) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    z-index: 19;
    inset: 0;
    border: 0;
    background: ${({ theme }) => theme.colors.overlayNavigation};
  }
`;

const navigation = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'my-tasks', label: 'My tasks', icon: ListTodo },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
];

export default function Sidebar({ activeNav, onNavigate, open, onClose, myTaskCount }) {
  const [projectsOpen, setProjectsOpen] = useState(true);
  return (
    <>
      <Overlay aria-label="Close navigation" $open={open} onClick={onClose} />
      <Rail $open={open} aria-label="Main navigation">
        <Brand>
          <BrandMark>
            <Command size={18} strokeWidth={2.4} />
          </BrandMark>
          <BrandName>gather</BrandName>
        </Brand>
        <WorkspacePicker aria-label="Current workspace">
          <WorkspaceBadge>NS</WorkspaceBadge>
          <WorkspaceText>
            <strong>Northstar Studio</strong>
            <small>Free workspace</small>
          </WorkspaceText>
          <ChevronDown size={15} color="currentColor" />
        </WorkspacePicker>
        <NavSection>
          <SectionLabel>Workspace</SectionLabel>
          {navigation.map(({ id, label, icon: Icon }) => (
            <NavItem
              key={id}
              $active={activeNav === id}
              onClick={() => {
                onNavigate(id);
                onClose();
              }}
            >
              <Icon size={16} />
              {label}
              {id === 'my-tasks' && <Counter>{myTaskCount}</Counter>}
            </NavItem>
          ))}
        </NavSection>
        <NavSection>
          <SectionLabel>Projects</SectionLabel>
          <NavItem
            $active={activeNav === 'projects'}
            onClick={() => {
              setProjectsOpen(!projectsOpen);
              onNavigate('projects');
            }}
          >
            <FolderKanban size={16} />
            All projects
            <ExpandIcon size={14} $expanded={projectsOpen} />
          </NavItem>
          {projectsOpen &&
            projects.slice(1).map((project) => (
              <NavItem
                key={project.id}
                $active={false}
                onClick={() => {
                  onNavigate('projects', project.id);
                  onClose();
                }}
              >
                <ProjectDot $tone={project.color} />
                {project.shortName}
              </NavItem>
            ))}
        </NavSection>
        <Bottom>
          <NavItem onClick={() => onNavigate('settings')}>
            <Settings2 size={16} />
            Settings
          </NavItem>
          <HelpButton onClick={() => onNavigate('help')}>
            <CircleHelp size={16} />
            Help center
          </HelpButton>
          <Profile>
            <Avatar $small $color="accent">
              {currentUser.initials}
            </Avatar>
            <WorkspaceText>
              <strong>{currentUser.name}</strong>
              <small>{currentUser.role}</small>
            </WorkspaceText>
            <Sparkles size={14} />
          </Profile>
        </Bottom>
      </Rail>
    </>
  );
}
