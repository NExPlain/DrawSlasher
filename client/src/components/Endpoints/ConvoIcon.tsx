import { isAssistantsEndpoint } from 'librechat-data-provider';
import type {
  TAssistantsMap,
  TConversation,
  TEndpointsConfig,
  TPreset,
} from 'librechat-data-provider';
import { getEndpointField, getIconKey, getIconEndpoint } from '~/utils';
import { icons } from '~/components/Chat/Menus/Endpoints/Icons';
import ConvoIconURL from '~/components/Endpoints/ConvoIconURL';

export default function ConvoIcon({
  conversation,
  endpointsConfig,
  assistantMap,
  className = '',
  containerClassName = '',
  context,
  size,
}: {
  conversation: TConversation | TPreset | null;
  endpointsConfig: TEndpointsConfig;
  assistantMap: TAssistantsMap;
  containerClassName?: string;
  context?: 'message' | 'nav' | 'landing' | 'menu-item';
  className?: string;
  size?: number;
}) {
  const iconURL = conversation?.iconURL;
  let endpoint = conversation?.endpoint;
  endpoint = getIconEndpoint({ endpointsConfig, iconURL, endpoint });
  const assistant =
    isAssistantsEndpoint(endpoint) && assistantMap?.[endpoint]?.[conversation?.assistant_id ?? ''];
  const assistantName = (assistant && assistant?.name) || '';

  const avatar = (assistant && (assistant?.metadata?.avatar as string)) || '';
  const endpointIconURL = getEndpointField(endpointsConfig, endpoint, 'iconURL');
  const iconKey = getIconKey({ endpoint, endpointsConfig, endpointIconURL });
  const Icon = icons[iconKey];
  return (
    <>
      {iconURL && iconURL.includes('http') ? (
        <ConvoIconURL
          preset={conversation}
          endpointIconURL={'endpointIconURL'}
          assistantName={assistantName}
          assistantAvatar={avatar}
          context={context}
        />
      ) : (
        <div className={containerClassName}>
          {endpoint &&
            Icon &&
            Icon({
              size,
              context,
              className,
              iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Leaf_1_web.jpg/250px-Leaf_1_web.jpg',
              assistantName,
              endpoint,
              avatar,
            })}
        </div>
      )}
    </>
  );
}
