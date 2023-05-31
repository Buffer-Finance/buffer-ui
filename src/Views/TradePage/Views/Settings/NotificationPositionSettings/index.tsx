import { ResetButton } from '@Views/TradePage/Components/ResetButton';
import { RowGapItemsTop } from '@Views/TradePage/Components/Row';
import { SettingsHeaderText } from '@Views/TradePage/Components/TextWrapper';
import { PositionSelector } from './PositionSelector';
import { useAtom } from 'jotai';
import { defaultSettings } from '@Views/TradePage/config';
import { notificationPositionSettingsAtom } from '@Views/TradePage/atoms';

export const NotificationPositionSettings: React.FC = () => {
  const [settings, setSettings] = useAtom(notificationPositionSettingsAtom);

  console.log('notification position rerenders');

  function resetToDefault() {
    setSettings(defaultSettings.notificationPosition);
  }

  function handlePositionClick(position: number) {
    setSettings(position);
  }

  return (
    <div>
      <RowGapItemsTop gap="4px">
        <SettingsHeaderText>Notification Position</SettingsHeaderText>
        <ResetButton onClick={resetToDefault} className="mt-1" />
      </RowGapItemsTop>
      <PositionSelector
        selectedPosition={settings}
        onClick={handlePositionClick}
      />
    </div>
  );
};
