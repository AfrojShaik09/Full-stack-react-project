import { CalendarDays, GripVertical, MoreHorizontal } from 'lucide-react';
import styled from 'styled-components';
import { Avatar } from './Primitives.jsx';

const Card = styled.article`
  padding: 14px 14px 12px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 2px 5px rgba(25, 39, 29, 0.025);
  cursor: grab;
  transition:
    border-color 140ms ease,
    transform 140ms ease,
    box-shadow 140ms ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.lineStrong};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(25, 39, 29, 0.06);
  }
  &:active {
    cursor: grabbing;
  }
`;
const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 11px;
`;
const Tag = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  background: ${({ $tone, theme }) => theme.colors[`${$tone}Soft`] || theme.colors.surfaceMuted};
  color: ${({ $tone, theme }) => theme.colors[$tone] || theme.colors.inkMuted};
  font-size: 10px;
  font-weight: 700;
`;
const QuietButton = styled.button`
  display: grid;
  place-items: center;
  width: 25px;
  height: 25px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: ${({ theme }) => theme.colors.inkFaint};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;
const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.ink};
  font-size: 13px;
  line-height: 1.45;
  font-weight: 650;
`;
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`;
const MiniTag = styled.span`
  padding: 3px 7px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 9px;
`;
const Divider = styled.div`
  height: 1px;
  margin: 12px 0 10px;
  background: ${({ theme }) => theme.colors.line};
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
const Person = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 10px;
`;
const Due = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: ${({ $late, theme }) => ($late ? theme.colors.danger : theme.colors.inkFaint)};
  white-space: nowrap;
  font-size: 10px;
`;
const DragButton = styled.span`
  display: inline-flex;
  opacity: 0;
  color: ${({ theme }) => theme.colors.inkFaint};
  ${Card}:hover & {
    opacity: 1;
  }
`;

const toneForPriority = { high: 'coral', medium: 'gold', low: 'blue' };

export default function TaskCard({ task }) {
  const dueDate = new Date(`${task.dueDate}T12:00:00`);
  const formattedDate = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(
    dueDate,
  );
  const late = task.status !== 'done' && dueDate < new Date('2026-10-03T00:00:00');
  return (
    <Card
      draggable
      aria-label={`${task.title}, ${task.priority} priority, assigned to ${task.assignee}`}
    >
      <CardTop>
        <Tag $tone={toneForPriority[task.priority]}>{task.priority} priority</Tag>
        <QuietButton
          type="button"
          aria-label={`More options for ${task.title}`}
          title="More options"
        >
          <MoreHorizontal size={16} />
        </QuietButton>
      </CardTop>
      <Title>{task.title}</Title>
      <Tags>
        {task.tags.map((tag) => (
          <MiniTag key={tag}>{tag}</MiniTag>
        ))}
      </Tags>
      <Divider />
      <Footer>
        <Person>
          <Avatar
            $small
            $color={
              task.initials === 'MC'
                ? 'coral'
                : task.initials === 'JR'
                  ? 'blue'
                  : task.initials === 'DM'
                    ? 'gold'
                    : 'accent'
            }
          >
            {task.initials}
          </Avatar>
          <span>{task.assignee}</span>
        </Person>
        <Due $late={late}>
          <CalendarDays size={12} />
          {formattedDate}
          <DragButton aria-hidden="true">
            <GripVertical size={13} />
          </DragButton>
        </Due>
      </Footer>
    </Card>
  );
}
