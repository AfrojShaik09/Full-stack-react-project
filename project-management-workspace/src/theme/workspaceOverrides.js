import styled from 'styled-components';

export const WorkspaceLayout = styled.div`
  min-height: 100vh;
  display: flex;
`;

export const WorkspaceMain = styled.main`
  min-width: 0;
  flex: 1;
`;

export const WorkspaceContent = styled.div`
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

export const WorkspaceIntro = styled.div`
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

export const WorkspaceHeading = styled.div`
  h1 {
    margin: 6px 0 5px;
    font-size: 27px;
    line-height: 1.2;
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

export const WorkspaceIntroActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const WorkspaceAvatar = styled.span`
  width: ${({ $small, theme }) => ($small ? theme.sizes.avatar.small : theme.sizes.avatar.default)};
  height: ${({ $small, theme }) => ($small ? theme.sizes.avatar.small : theme.sizes.avatar.default)};
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  border: 2px solid ${({ theme }) => theme.colors.surface};
  border-radius: 50%;
  background: ${({ $color = 'accent', theme }) => theme.colors[$color] || theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
  font-size: ${({ theme }) => theme.sizes.font.xs};
  font-weight: 750;
`;

export const WorkspaceEyebrow = styled.span`
  color: ${({ theme }) => theme.colors.inkFaint};
  font-size: ${({ theme }) => theme.sizes.font.xs};
  font-weight: 700;
  text-transform: uppercase;
`;

export const WorkspaceInviteButton = styled.button`
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

export const WorkspaceAvatarStack = styled.div`
  display: flex;
  padding-left: 8px;
  & > * {
    margin-left: -8px;
  }
`;

export const WorkspaceStats = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 27px;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    gap: 8px;
  }
`;

export const WorkspaceStat = styled.article`
  min-height: 103px;
  padding: 16px 18px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.sizes.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    min-height: 90px;
    padding: 12px 11px;
  }
`;

export const WorkspaceStatLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 11px;
  font-weight: 600;
  svg {
    color: ${({ $tone = 'accent', theme }) => theme.colors[$tone]};
  }
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    font-size: 9px;
  }
`;

export const WorkspaceStatValue = styled.strong`
  display: block;
  margin-top: 8px;
  font-size: 26px;
  line-height: 1;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    font-size: 22px;
  }
`;

export const WorkspaceStatChange = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-left: 7px;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 9px;
  font-weight: 700;
`;

export const WorkspaceBoardSection = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
`;

export const WorkspaceBoardHeader = styled.div`
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

export const WorkspaceBoardTitle = styled.div`
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

export const WorkspaceProjectMark = styled.span`
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.sizes.radius.md};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accent};
`;

export const WorkspaceTools = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.compact}) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const WorkspaceToolButton = styled.button`
  min-height: ${({ theme }) => theme.sizes.control.compact};
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.sizes.radius.sm};
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

export const WorkspaceViewToggle = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.sizes.radius.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

export const WorkspaceViewOption = styled.button`
  width: 30px;
  height: 27px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: ${({ theme }) => theme.sizes.radius.sm};
  background: ${({ $active, theme }) => ($active ? theme.colors.surface : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.inkFaint)};
  box-shadow: ${({ $active, theme }) => ($active ? theme.colors.shadowRaised : 'none')};
  cursor: pointer;
`;

export const WorkspaceBoard = styled.div`
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

export const WorkspaceColumn = styled.section`
  min-width: 0;
`;

export const WorkspaceColumnHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const WorkspaceColumnDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $tone, theme }) =>
    $tone === 'accent'
      ? theme.colors.accent
      : $tone === 'success'
        ? theme.colors.blue
        : theme.colors.inkFaint};
`;

export const WorkspaceColumnName = styled.h3`
  margin: 0;
  font-size: 11px;
  font-weight: 700;
`;

export const WorkspaceCount = styled.span`
  min-width: 19px;
  padding: 1px 5px;
  border-radius: ${({ theme }) => theme.sizes.radius.sm};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.inkFaint};
  text-align: center;
  font-size: 9px;
`;

export const WorkspaceAddTaskButton = styled.button`
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
  margin-left: auto;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: ${({ theme }) => theme.colors.inkFaint};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

export const WorkspaceCardList = styled.div`
  display: grid;
  align-content: start;
  gap: 9px;
  min-height: 115px;
  padding: 2px;
  border-radius: 10px;
  transition: background 120ms ease;
  ${({ $over, theme }) => $over && `background:${theme.colors.accentSoft};`}
`;

export const WorkspaceTaskRows = styled.div`
  padding: 4px 20px 16px;
  @media (max-width: ${({ theme }) => theme.sizes.breakpoint.mobile}) {
    padding: 4px 13px 14px;
  }
`;

export const WorkspaceTaskRow = styled.div`
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

export const WorkspaceTaskName = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  font-weight: 650;
`;

export const WorkspaceCompleteButton = styled.button`
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

export const WorkspaceRowMeta = styled.span`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const WorkspaceEmptyState = styled.div`
  padding: 26px 10px;
  color: ${({ theme }) => theme.colors.inkFaint};
  text-align: center;
  font-size: 11px;
`;

export const WorkspaceCalendar = styled.div`
  padding: 28px 22px 34px;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: center;
  p {
    max-width: 330px;
    margin: 8px auto 0;
    font-size: 11px;
  }
`;

export const WorkspaceCalendarTitle = styled.h3`
  margin: 9px 0 0;
  color: inherit;
  font-size: 13px;
`;

export const WorkspaceCalendarBackButton = styled.button`
  min-height: ${({ theme }) => theme.sizes.control.default};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.sizes.space[2]};
  padding: 0 ${({ theme }) => theme.sizes.space[4]};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.sizes.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 650;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
  margin-top: 16px;
`;

export const WorkspaceToast = styled.div`
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

export const WorkspaceLoading = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

export const WorkspacePageNote = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 3px;
  color: ${({ theme }) => theme.colors.inkFaint};
  font-size: 10px;
`;

export const WorkspaceNoteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: inherit;
`;

export const WorkspaceProjectDetailsButton = styled.button`
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.sizes.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.inkMuted};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.surfaceMuted};
    border-color: ${({ theme }) => theme.colors.lineStrong};
  }
  width: ${({ theme }) => theme.sizes.control.iconSmall};
  height: ${({ theme }) => theme.sizes.control.iconSmall};
  margin-left: 2px;
`;
