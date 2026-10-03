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
import { currentUser } from '../data/workspaceConfig.js';
import Sidebar from '../components/Sidebar.jsx';
import TaskCard from '../components/TaskCard.jsx';
import TaskDialog from '../components/TaskDialog.jsx';
import Topbar from '../components/Topbar.jsx';
import {
  WorkspaceAddTaskButton as AddColumnTask,
  WorkspaceAvatar as Avatar,
  WorkspaceAvatarStack as AvatarStack,
  WorkspaceBoard as Board,
  WorkspaceBoardHeader as BoardHeader,
  WorkspaceBoardSection as BoardSection,
  WorkspaceBoardTitle as BoardTitle,
  WorkspaceCalendar as CalendarView,
  WorkspaceCalendarBackButton as CalendarBackButton,
  WorkspaceCalendarTitle as CalendarTitle,
  WorkspaceCardList as CardList,
  WorkspaceColumn as Column,
  WorkspaceColumnDot as ColumnDot,
  WorkspaceColumnHeader as ColumnHeader,
  WorkspaceColumnName as ColumnName,
  WorkspaceCompleteButton as Checkbox,
  WorkspaceContent as Content,
  WorkspaceCount as Count,
  WorkspaceEmptyState as Empty,
  WorkspaceHeading as Heading,
  WorkspaceEyebrow as Eyebrow,
  WorkspaceIntro as Intro,
  WorkspaceIntroActions as IntroRight,
  WorkspaceInviteButton as InviteButton,
  WorkspaceLayout as Layout,
  WorkspaceLoading as Loading,
  WorkspaceMain as Main,
  WorkspaceNoteButton as NoteButton,
  WorkspacePageNote as PageNote,
  WorkspaceProjectDetailsButton as ProjectDetailsButton,
  WorkspaceProjectMark as ProjectMark,
  WorkspaceRowMeta as RowMeta,
  WorkspaceStat as Stat,
  WorkspaceStatChange as StatChange,
  WorkspaceStatLabel as StatTop,
  WorkspaceStats as Stats,
  WorkspaceStatValue as StatNumber,
  WorkspaceTaskName as RowTask,
  WorkspaceTaskRow as ListRow,
  WorkspaceTaskRows as ListRows,
  WorkspaceToast as Toast,
  WorkspaceToolButton as ToolButton,
  WorkspaceTools as Tools,
  WorkspaceViewOption as Segment,
  WorkspaceViewToggle as Segmented,
} from '../theme.js';
import { useWorkspacePage } from '../hooks/useWorkspacePage.js';

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
