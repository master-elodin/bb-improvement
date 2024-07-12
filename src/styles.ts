import { InlineStyle } from './inlineStyles';
import { rowTitleStyles } from './components/Row/RowTitle/RowTitle.style';
import { drawerFiltersStyle } from './components/DrawerFilters/DrawerFilters.style';
import { dropdownStyle } from './components/Dropdown/Dropdown-style';
import { buttonStyle } from './components/Button/Button-style';
import { iconsStyle } from './components/Icons/Icons.style';
import { spinnerStyle } from './components/Spinner/Spinner.style';
import { reviewersStyle } from './components/Row/Reviewers/Reviewers.style';
import { appStyle } from './components/App/App.style';
import { drawerStyle } from './components/Drawer/Drawer.style';
import { darkModeToggleStyle } from './components/App/DarkModeToggle.style';
import { regexFilterStyle } from './components/DrawerFilters/RegexFilter/RegexFilter.style';
import { appHeaderStyle } from './components/App/AppHeader/AppHeader.style';
import { modalStyle } from './components/Modal/Modal.style';
import { savedRegexDropdownStyle } from './components/DrawerFilters/RegexFilter/SavedRegexDropdown.style';
import { popoverStyle } from './components/Popover/Popover.style';
import { buildStatusStyle } from './components/Row/BuildStatus/BuildStatus.style';
import { jiraIssueStyle } from './components/Row/JiraIssue/JiraIssue.style';
import { rowStyle } from './components/Row/Row.style';
import { lastActivityStyle } from './components/Row/LastActivity/LastActivity.style';
import { branchSyncInfoStyles } from './components/Row/RowTitle/BranchSyncInfo.style';

export const initStyles = () => {
  InlineStyle({
    body: {
      '--spacing-md': '12px',
      '--text-size': '14px',
      'background-color': 'var(--color-background-alt)',
      'font-family':
        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
      'font-size': 'var(--text-size)',
      margin: 0,
    },
    'a, .link': {
      color: 'var(--color-link) !important',
    },
    select: {
      height: '24px',
    },
    button: {
      height: '24px',
      cursor: 'pointer',
    },
    ...appStyle,
    ...appHeaderStyle,
    ...buildStatusStyle,
    ...branchSyncInfoStyles,
    ...buttonStyle,
    ...darkModeToggleStyle,
    ...drawerFiltersStyle,
    ...drawerStyle,
    ...dropdownStyle,
    ...iconsStyle,
    ...jiraIssueStyle,
    ...lastActivityStyle,
    ...modalStyle,
    ...popoverStyle,
    ...regexFilterStyle,
    ...reviewersStyle,
    ...rowStyle,
    ...rowTitleStyles,
    ...savedRegexDropdownStyle,
    ...spinnerStyle,
  });
};
