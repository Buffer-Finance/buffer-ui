import { useActiveChain } from '@Hooks/useActiveChain';
import { ContentCopy } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import BufferLogo from '@Public/ComponentSVGS/bufferLogo';
import FrontArrow from '@SVG/frontArrow';
import { useUserCode } from '@Views/Referral/Hooks/useUserCode';
import { useEffect, useState } from 'react';
import { useCopyToClipboard } from 'react-use';

export const ReferralLink = () => {
  const [open, setOpen] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  const { hostname } = window.location;
  const { activeChain } = useActiveChain();
  const { affiliateCode } = useUserCode(activeChain);

  const link = `https://${hostname}/#/?ref=${affiliateCode}`;

  const copyLink = () => {
    try {
      copyToClipboard(link);
      setOpen(true);
    } catch (err) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    }
  }, [open]);

  return (
    <div className="rounded-lg px-[30px] py-8 bg-2 flex items-center justify-between my-6 sm:flex-col sm:gap-6 sm:px-6 sm:py-6">
      {/* left side */}
      <div className="flex items-start gap-5">
        <BufferLogo height={60} width={60} />{' '}
        <div className="flex flex-col items-start justify-center ">
          <div className="text-f20 mt-2 sm:text-f16">
            Invite your friends to use Buffer
          </div>
          <div className="text-f14 sm:text-f12">
            Get fee discounts and rebates!&nbsp;
            <span
              className="light-blue-text  whitespace-nowrap hover:underline  cursor-pointer"
              onClick={() => {
                window.open('#', '_blank');
              }}
            >
              Learn more
              <FrontArrow className="tml w-fit inline" />
            </span>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="flex flex-col items-end gap-2 sm:items-center">
        <Tooltip
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          title="Copied"
          placement="top"
          disableFocusListener
          disableHoverListener
          disableTouchListener
          classes={{
            tooltip: 'tooltip',
            arrow: 'arrow',
          }}
        >
          <button
            onClick={copyLink}
            className="bg-blue rounded-md text-f16 flex items-center gap-2 px-5 py-2"
          >
            <ContentCopy />
            Copy Referral Link
          </button>
        </Tooltip>
        <div className="text-f14">Your Referral Code : {affiliateCode}</div>
      </div>
    </div>
  );
};
