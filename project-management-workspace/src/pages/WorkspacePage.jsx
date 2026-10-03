import {
  ArrowDownUp,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Columns3,
  List,
  Plus,
  SlidersHorizontal,
  Sparkles,
  Users,
} from 'lucide-react';
import styled from 'styled-components';
import { currentUser } from '../data/workspaceConfig.js';
import Sidebar from '../components/Sidebar.jsx';
import TaskCard from '../components/TaskCard.jsx';
import TaskDialog from '../components/TaskDialog.jsx';
import Topbar from '../components/Topbar.jsx';
import { ActionButton, Avatar, Eyebrow, IconButton } from '../components/Primitives.jsx';
import { useWorkspacePage } from '../hooks/useWorkspacePage.js';

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  --sidebar-rule: ${({ theme }) => theme.colors.line};
`;
const Main = styled.main`
  min-width: 0;
  flex: 1;
`;
const Content = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 33px 35px 48px;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.tablet}) {
    padding: 28px 22px 38px;
  }
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    padding: 23px 14px 32px;
  }
`;
const Intro = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 27px;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.content}) {
    align-items: flex-start;
    flex-direction: column;
  }
`;
const Heading = styled.div`
  h1 {
    margin: 6px 0 5px;
    font-size: 27px;
    line-height: 1.2;
    letter-spacing: 0;
    font-weight: 700;
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.inkMuted};
    font-size: 12px;
  }
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    h1 {
      font-size: 23px;
    }
  }
`;
const IntroRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const InviteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 2px;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 11px;
  font-weight: 650;
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    display: none;
  }
`;
const AvatarStack = styled.div`
  display: flex;
  padding-left: 8px;
  & > * {
    margin-left: -8px;
  }
`;
const Stats = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 27px;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    gap: 8px;
  }
`;
const Stat = styled.article`
  position: relative;
  min-height: 103px;
  padding: 16px 18px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    min-height: 90px;
    padding: 12px 11px;
  }
`;
const StatTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 11px;
  font-weight: 600;
  svg {
    color: ${({ $tone, theme }) => theme.colors[$tone]};
  }
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    font-size: 9px;
  }
`;
const StatNumber = styled.strong`
  display: block;
  margin-top: 8px;
  font-size: 26px;
  line-height: 1;
  letter-spacing: 0;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    font-size: 22px;
  }
`;
const StatChange = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-left: 7px;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 9px;
  font-weight: 700;
`;
const BoardSection = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
`;
const BoardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 17px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.content}) {
    align-items: flex-start;
    flex-direction: column;
    padding: 15px;
  }
`;
const BoardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  h2 {
    margin: 0;
    font-size: 14px;
  }
  p {
    margin: 2px 0 0;
    color: ${({ theme }) => theme.colors.inkMuted};
    font-size: 10px;
  }
`;
const ProjectMark = styled.span`
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accent};
`;
const Tools = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.compact}) {
    width: 100%;
    justify-content: space-between;
  }
`;
const ToolButton = styled.button`
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.compact}) {
    padding: 0 8px;
  }
`;
const Segmented = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;
const Segment = styled.button`
  width: 30px;
  height: 27px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 6px;
  background: ${({ $active, theme }) => ($active ? theme.colors.surface : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.inkFaint)};
  box-shadow: ${({ $active }) => ($active ? '0 1px 4px rgba(20,35,24,.12)' : 'none')};
  cursor: pointer;
`;
const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(235px, 1fr));
  gap: 14px;
  padding: 18px 19px 22px;
  overflow: auto;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.content}) {
    grid-template-columns: repeat(3, minmax(245px, 1fr));
    padding: 14px;
  }
`;
const Column = styled.section`
  min-width: 0;
`;
const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;
const ColumnDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $tone, theme }) => ($tone === 'accent' ? theme.colors.accent : $tone === 'success' ? theme.colors.blue : theme.colors.inkFaint)};
`;
const ColumnName = styled.h3`
  margin: 0;
  font-size: 11px;
  font-weight: 700;
`;
const Count = styled.span`
  min-width: 19px;
  padding: 1px 5px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.inkFaint};
  text-align: center;
  font-size: 9px;
`;
const AddColumnTask = styled.button`
  margin-left: auto;
  display: grid;
  place-items: center;
  width: 25px;
  height: 25px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: ${({ theme }) => theme.colors.inkFaint};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;
const CardList = styled.div`
  display: grid;
  align-content: start;
  gap: 9px;
  min-height: 115px;
  padding: 2px;
  border-radius: 10px;
  transition: background 120ms ease;
  ${({ $over, theme }) => $over && `background:${theme.colors.accentSoft};`}
`;
const ListRows = styled.div`
  padding: 4px 20px 16px;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    padding: 4px 13px 14px;
  }
`;
const ListRow = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 2fr) 1fr 90px 80px;
  align-items: center;
  gap: 12px;
  min-height: 57px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  font-size: 11px;
  &:last-child {
    border-bottom: 0;
  }
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.content}) {
    grid-template-columns: minmax(160px, 2fr) 1fr 72px;
    & > *:nth-child(3) {
      display: none;
    }
  }
`;
const RowTask = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  font-weight: 650;
`;
const Checkbox = styled.button`
  width: 17px;
  height: 17px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border: 1px solid ${({ $done, theme }) => ($done ? theme.colors.accent : theme.colors.lineStrong)};
  border-radius: 5px;
  background: ${({ $done, theme }) => ($done ? theme.colors.accent : 'transparent')};
  color: ${({ theme }) => theme.colors.onStatus};
  cursor: pointer;
`;
const RowMeta = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Empty = styled.div`
  padding: 26px 10px;
  color: ${({ theme }) => theme.colors.inkFaint};
  text-align: center;
  font-size: 11px;
`;
const CalendarView = styled.div`
  padding: 28px 22px 34px;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: center;
  p {
    max-width: 330px;
    margin: 8px auto 0;
    font-size: 11px;
  }
`;
const Toast = styled.div`
  position: fixed;
  right: 23px;
  bottom: 23px;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  font-size: 12px;
`;
const Loading = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.inkMuted};
`;
const PageNote = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 3px;
  color: ${({ theme }) => theme.colors.inkFaint};
  font-size: 10px;
`;
const NoteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: inherit;
`;
const ProjectDetailsButton = styled(IconButton)`
  width: 31px;
  height: 31px;
  margin-left: 2px;
`;
const CalendarTitle = styled.h3`
  margin: 9px 0 0;
  color: inherit;
  font-size: 13px;
`;
const CalendarBackButton = styled(ActionButton)`
  margin-top: 16px;
`;

const headingByNav = {
  'my-tasks': 'My tasks',
  calendar: 'Your calendar',
  projects: 'Project workspace',
  settings: 'Workspace settings',
  help: 'Help center',
};

export default function WorkspacePage({ dark, onToggleTheme }) {
  const {
    workspace,
    activeNav,
    dialogOpen,
    menuOpen,
    overColumnId,
    toast,
    columns,
    projects,
    visibleTasks: filteredTasks,
    myTaskCount,
    currentProject,
    dateLabel,
    greeting,
    navigate,
    createTask,
    startDragging,
    dragOverColumn,
    endDragging,
    leaveColumn,
    dropTask,
    completeTask,
    notify,
    setDialogOpen,
    setMenuOpen,
  } = useWorkspacePage();

  if (!workspace.hydrated) return <Loading role="status">Opening your workspace...</Loading>;

  return (
    <Layout>
      <Sidebar
        activeNav={activeNav}
        onNavigate={navigate}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        myTaskCount={myTaskCount}
      />
      <Main>
        <Topbar
          search={workspace.search}
          onSearch={workspace.searchTasks}
          onCreate={() => setDialogOpen(true)}
          dark={dark}
          onToggleTheme={onToggleTheme}
          onOpenMenu={() => setMenuOpen(true)}
        />
        <Content>
          <Intro>
            <Heading>
              <Eyebrow>{dateLabel}</Eyebrow>
              <h1>
                {activeNav === 'overview'
                  ? greeting
                  : headingByNav[activeNav] || 'Project workspace'}
              </h1>
              <p>Here’s what’s moving across your team today.</p>
            </Heading>
            <IntroRight>
              <AvatarStack aria-label="Workspace collaborators including Afroj Shaik">
                <Avatar $small $color="coral">
                  MC
                </Avatar>
                <Avatar $small $color="blue">
                  JR
                </Avatar>
                <Avatar $small $color="gold">
                  DM
                </Avatar>
                <Avatar $small $color="accent">
                  {currentUser.initials}
                </Avatar>
              </AvatarStack>
              <InviteButton onClick={() => notify('Invite link copied')}>
                <Users size={15} />
                Invite team
                <ArrowUpRight size={13} />
              </InviteButton>
            </IntroRight>
          </Intro>
          <Stats aria-label="Workspace task overview">
            <Stat>
              <StatTop $tone="accent">
                Open tasks
                <ArrowDownUp size={15} />
              </StatTop>
              <StatNumber>
                {workspace.stats.open}
                <StatChange>
                  <ArrowUpRight size={12} />
                  12%
                </StatChange>
              </StatNumber>
            </Stat>
            <Stat>
              <StatTop $tone="gold">
                In progress
                <Sparkles size={15} />
              </StatTop>
              <StatNumber>
                {workspace.stats.inProgress}
                <StatChange>Across 3 projects</StatChange>
              </StatNumber>
            </Stat>
            <Stat>
              <StatTop $tone="blue">
                Completed
                <Check size={16} />
              </StatTop>
              <StatNumber>
                {workspace.stats.completed}
                <StatChange>This week</StatChange>
              </StatNumber>
            </Stat>
          </Stats>
          <BoardSection>
            <BoardHeader>
              <BoardTitle>
                <ProjectMark>
                  <Columns3 size={16} />
                </ProjectMark>
                <div>
                  <h2>{currentProject.id === 'all' ? 'Team board' : currentProject.name}</h2>
                  <p>{filteredTasks.length} tasks · Updated just now</p>
                </div>
                <ProjectDetailsButton
                  aria-label="Project details"
                  title="Project details"
                  onClick={() => notify('Project details are up to date')}
                >
                  <ChevronDown size={15} />
                </ProjectDetailsButton>
              </BoardTitle>
              <Tools>
                <ToolButton onClick={() => notify('Filters are ready')}>
                  <SlidersHorizontal size={14} />
                  Filter
                </ToolButton>
                <ToolButton onClick={() => notify('Tasks sorted by due date')}>
                  <ArrowDownUp size={14} />
                  <span>Sort</span>
                </ToolButton>
                <Segmented aria-label="Task view">
                  <Segment
                    type="button"
                    aria-label="Board view"
                    title="Board view"
                    $active={workspace.activeView === 'board'}
                    onClick={() => workspace.selectView('board')}
                  >
                    <Columns3 size={15} />
                  </Segment>
                  <Segment
                    type="button"
                    aria-label="List view"
                    title="List view"
                    $active={workspace.activeView === 'list'}
                    onClick={() => workspace.selectView('list')}
                  >
                    <List size={15} />
                  </Segment>
                </Segmented>
                <ToolButton onClick={() => workspace.selectView('calendar')}>
                  <CalendarDays size={14} />
                  <span>Calendar</span>
                </ToolButton>
              </Tools>
            </BoardHeader>
            {workspace.activeView === 'board' && (
              <Board aria-label="Task board">
                {columns.map((column) => {
                  const columnTasks = filteredTasks.filter((task) => task.status === column.id);
                  return (
                    <Column key={column.id} aria-label={`${column.label} tasks`}>
                      <ColumnHeader>
                        <ColumnDot $tone={column.tone} />
                        <ColumnName>{column.label}</ColumnName>
                        <Count>{columnTasks.length}</Count>
                        <AddColumnTask
                          type="button"
                          aria-label={`Add task to ${column.label}`}
                          onClick={() => setDialogOpen(true)}
                        >
                          <Plus size={15} />
                        </AddColumnTask>
                      </ColumnHeader>
                      <CardList
                        $over={overColumnId === column.id}
                        onDragOver={(event) => dragOverColumn(event, column.id)}
                        onDragLeave={leaveColumn}
                        onDrop={(event) => dropTask(event, column.id)}
                      >
                        {columnTasks.map((task) => (
                          <div
                            key={task.id}
                            onDragStart={(event) => startDragging(event, task.id)}
                            onDragEnd={endDragging}
                          >
                            <TaskCard task={task} />
                          </div>
                        ))}
                        {columnTasks.length === 0 && <Empty>Drop a task here</Empty>}
                      </CardList>
                    </Column>
                  );
                })}
              </Board>
            )}
            {workspace.activeView === 'list' && (
              <ListRows>
                {filteredTasks.length === 0 ? (
                  <Empty>No tasks match your search.</Empty>
                ) : (
                  filteredTasks.map((task) => (
                    <ListRow key={task.id}>
                      <RowTask>
                        <Checkbox
                          type="button"
                          aria-label={`${task.status === 'done' ? 'Reopen' : 'Complete'} ${task.title}`}
                          $done={task.status === 'done'}
                          onClick={() => completeTask(task)}
                        >
                          {task.status === 'done' && <Check size={12} />}
                        </Checkbox>
                        <span>{task.title}</span>
                      </RowTask>
                      <RowMeta>
                        {projects.find((project) => project.id === task.projectId)?.name}
                      </RowMeta>
                      <RowMeta>{task.assignee}</RowMeta>
                      <RowMeta>
                        {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(
                          new Date(`${task.dueDate}T12:00:00`),
                        )}
                      </RowMeta>
                    </ListRow>
                  ))
                )}
              </ListRows>
            )}
            {workspace.activeView === 'calendar' && (
              <CalendarView>
                <CalendarDays size={23} />
                <CalendarTitle>Your week, at a glance</CalendarTitle>
                <p>
                  Calendar view is ready for your tasks. Switch to the board or list to move work
                  between stages.
                </p>
                <CalendarBackButton
                  $variant="secondary"
                  onClick={() => workspace.selectView('board')}
                >
                  Back to board
                </CalendarBackButton>
              </CalendarView>
            )}
          </BoardSection>
          <PageNote>
            <span>
              Showing {filteredTasks.length} tasks from {workspace.allTasks.length} in this
              workspace
            </span>
            <NoteButton type="button" onClick={() => notify('You are all caught up')}>
              <CircleHelp size={13} />
              Need a hand?
            </NoteButton>
          </PageNote>
        </Content>
      </Main>
      {dialogOpen && (
        <TaskDialog
          activeProjectId={workspace.activeProjectId}
          onClose={() => setDialogOpen(false)}
          onSubmit={createTask}
        />
      )}
      {toast && (
        <Toast role="status">
          <Check size={15} />
          {toast}
        </Toast>
      )}
    </Layout>
  );
}
