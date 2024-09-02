import { EModelEndpoint, isAssistantsEndpoint } from 'librechat-data-provider';
import { useGetEndpointsQuery, useGetStartupConfig } from 'librechat-data-provider/react-query';
import { useContext, type ReactNode } from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '~/components/ui';
import { useChatContext, useAssistantsMapContext } from '~/Providers';
import ConvoIcon from '~/components/Endpoints/ConvoIcon';
import { BirthdayIcon } from '~/components/svg';
import { getIconEndpoint, cn } from '~/utils';
import { ThemeContext, useLocalize } from '~/hooks';
import ScriptWriterLanding from './ScriptWriterLanding';

export default function Landing({ Header }: { Header?: ReactNode }) {
  const { conversation } = useChatContext();
  const assistantMap = useAssistantsMapContext();
  const { data: startupConfig } = useGetStartupConfig();
  const { data: endpointsConfig } = useGetEndpointsQuery();

  const localize = useLocalize();

  let { endpoint = '' } = conversation ?? {};
  const { assistant_id = null } = conversation ?? {};

  if (
    endpoint === EModelEndpoint.chatGPTBrowser ||
    endpoint === EModelEndpoint.azureOpenAI ||
    endpoint === EModelEndpoint.gptPlugins
  ) {
    endpoint = EModelEndpoint.openAI;
  }

  const iconURL = conversation?.iconURL;
  endpoint = getIconEndpoint({ endpointsConfig, iconURL, endpoint });
  const { theme } = useContext(ThemeContext);

  const isAssistant = isAssistantsEndpoint(endpoint);
  const assistant = isAssistant && assistantMap?.[endpoint]?.[assistant_id ?? ''];
  const assistantName = (assistant && assistant?.name) || '';
  const assistantDesc = (assistant && assistant?.description) || '';
  const avatar = (assistant && (assistant?.metadata?.avatar as string)) || '';

  const containerClassName =
    'shadow-stroke relative flex h-full items-center justify-center rounded-full bg-white text-black';

  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <div className="relative h-full">
          <div className="absolute left-0 right-0">{Header && Header}</div>
          <div className="flex h-full flex-col items-center justify-center">
            <ScriptWriterLanding localize={localize} theme='dark' />
          </div>
        </div>
      </Tooltip>
    </TooltipProvider>
  );
}
