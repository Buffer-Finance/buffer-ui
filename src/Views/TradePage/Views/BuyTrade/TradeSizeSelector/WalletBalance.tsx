import { RowGap } from '@Views/TradePage/Components/Row';
import { SettingsText } from '@Views/TradePage/Components/TextWrapper';

export const WalletBalance: React.FC<{
  balance: string | number;
  unit: string;
}> = ({ balance, unit }) => {
  return (
    <RowGap gap="4px">
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_404_5647)">
          <path
            d="M3.71899 7.22181V2.77857C3.7189 2.63251 3.74539 2.48785 3.79695 2.35289C3.84851 2.21792 3.92412 2.09529 4.01946 1.992C4.1148 1.88872 4.228 1.80681 4.35259 1.75095C4.47718 1.6951 4.6107 1.6664 4.74554 1.6665H9.48104V1.11227C9.48211 0.818729 9.37558 0.536733 9.18486 0.328219C8.99414 0.119705 8.73482 0.00172471 8.46385 0.000191127H1.05798C0.784152 -0.00527224 0.519401 0.106581 0.321286 0.311435C0.123171 0.516288 0.00770809 0.79758 0 1.09416V8.90623C0.00822638 9.20242 0.123916 9.48316 0.321975 9.68755C0.520033 9.89193 0.78449 10.0035 1.05798 9.99802H8.46185C8.59604 9.99745 8.7288 9.96822 8.85255 9.91199C8.9763 9.85577 9.08859 9.77366 9.18301 9.67037C9.27743 9.56707 9.35212 9.44462 9.4028 9.31002C9.45348 9.17542 9.47916 9.03131 9.47837 8.88594V8.33171H4.74286C4.47131 8.33133 4.21098 8.21425 4.01903 8.00616C3.82707 7.79808 3.71916 7.51599 3.71899 7.22181Z"
            fill="#C3C2D4"
          />
          <path
            d="M4.73633 3.17732V6.8229C4.73668 6.93327 4.77731 7.039 4.84935 7.11704C4.92139 7.19508 5.01899 7.2391 5.12087 7.23948H9.61629C9.71816 7.2391 9.81577 7.19508 9.88781 7.11704C9.95984 7.039 10.0005 6.93327 10.0008 6.8229V3.17732C10.0005 3.06695 9.95984 2.96122 9.88781 2.88318C9.81577 2.80514 9.71816 2.76112 9.61629 2.76074H5.11953C5.01788 2.7615 4.92062 2.80568 4.84887 2.88368C4.77712 2.96168 4.73668 3.0672 4.73633 3.17732ZM6.59081 5.83109C6.43469 5.84193 6.27922 5.80098 6.14512 5.7137C6.01103 5.62642 5.90466 5.49694 5.8402 5.34253C5.77573 5.18811 5.75624 5.01608 5.7843 4.84935C5.81236 4.68262 5.88664 4.52912 5.99726 4.40928C6.10789 4.28944 6.24959 4.20897 6.40349 4.17857C6.55739 4.14817 6.71619 4.16929 6.85874 4.23913C7.00128 4.30896 7.1208 4.42419 7.20137 4.56946C7.28194 4.71473 7.31973 4.88315 7.30973 5.05227C7.29775 5.25457 7.21817 5.44522 7.08585 5.58856C6.95353 5.7319 6.77755 5.81812 6.59081 5.83109Z"
            fill="#C3C2D4"
          />
        </g>
        <defs>
          <clipPath id="clip0_404_5647">
            <rect width="10" height="10" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <SettingsText>
        {balance}&nbsp;{unit}
      </SettingsText>
    </RowGap>
  );
};

export function formatBalance(balance: string) {
  const number = parseFloat(balance);

  const absoluteValue = Math.abs(number);

  if (absoluteValue < 1000) {
    return number.toString();
  } else if (absoluteValue < 1000000) {
    return (number / 1000).toFixed(1) + 'k';
  } else if (absoluteValue < 1000000000) {
    return (number / 1000000).toFixed(1) + 'm';
  } else {
    return (number / 1000000000).toFixed(1) + 'b';
  }
}
