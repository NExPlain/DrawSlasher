import { EModelEndpoint } from 'librechat-data-provider';
import type { IconMapProps } from '~/common';
import {
  MinimalPlugin,
  GPTIcon,
  AnthropicIcon,
  AzureMinimalIcon,
  BingAIMinimalIcon,
  GoogleMinimalIcon,
  CustomMinimalIcon,
  AssistantIcon,
  LightningIcon,
  Sparkles,
} from '~/components/svg';
import UnknownIcon from './UnknownIcon';
import FilmComposerIcon from '~/../public/assets/film_composer_icon.png';
import { cn } from '~/utils';

const AssistantAvatar = ({ className = '', assistantName, avatar, size }: IconMapProps) => {
  if (assistantName && avatar) {
    return (
      <img
        src={avatar}
        className="bg-token-surface-secondary dark:bg-token-surface-tertiary h-full w-full rounded-full object-cover"
        alt={assistantName}
        width="80"
        height="80"
      />
    );
  } else if (assistantName) {
    return <AssistantIcon className={cn('text-token-secondary', className)} size={size} />;
  }

  return <Sparkles className={cn(assistantName === '' ? 'icon-2xl' : '', className)} />;
};
const FilmComposerAvatar = ({ className = '',assistantName, avatar, size }: IconMapProps) => {
  return (
    <img
      src={FilmComposerIcon}
      className={cn('text-token-secondary', className)}
      alt="Film Composer"
      width={size}
      height={size}
    />
  );
};

export const icons = {
  [EModelEndpoint.azureOpenAI]: FilmComposerAvatar,
  [EModelEndpoint.openAI]: FilmComposerAvatar,
  [EModelEndpoint.gptPlugins]: FilmComposerAvatar,
  [EModelEndpoint.anthropic]: FilmComposerAvatar,
  [EModelEndpoint.chatGPTBrowser]: FilmComposerAvatar,
  [EModelEndpoint.google]: FilmComposerAvatar,
  [EModelEndpoint.bingAI]: FilmComposerAvatar,
  [EModelEndpoint.custom]: FilmComposerAvatar,
  [EModelEndpoint.assistants]: FilmComposerAvatar,
  [EModelEndpoint.azureAssistants]: FilmComposerAvatar,
  unknown: UnknownIcon,
};
