import { memo } from 'react';
import { useChatContext } from '~/Providers';
import { useSetIndexOptions, useDebouncedInput, useLocalize } from '~/hooks';
import { cn, defaultTextProps } from '~/utils';
import {
  Label,
  TextareaAutosize,
} from '~/components/ui';

function PromptPrefixEditor() {
  const { conversation } = useChatContext();
  const { setOption } = useSetIndexOptions();
  const localize = useLocalize();
  const {
    promptPrefix,
  } = conversation ?? {};
  const [setPromptPrefix, promptPrefixValue] = useDebouncedInput({
    setOption,
    optionKey: 'promptPrefix',
    initialValue: promptPrefix,
  });

  return (
    <div className="grid w-full items-center gap-2 py-10 justify-items-center">
      <div className="grid w-1/2 flex-col gap-2">
        <Label htmlFor="promptPrefix" className="text-left text-sm font-medium">
          {localize('com_endpoint_prompt_prefix')}{' '}
          <small className="opacity-40">({localize('com_endpoint_default_blank')})</small>
        </Label>
        <TextareaAutosize
          id="promptPrefix"
          value={(promptPrefixValue as string) || ''}
          onChange={setPromptPrefix}
          placeholder={localize('com_endpoint_openai_prompt_prefix_placeholder')}
          className={cn(
            defaultTextProps,
            'flex max-h-[138px] min-h-[100px] w-full resize-none px-3 py-2 ',
          )}
        />
      </div>
    </div>
  );
}

export default memo(PromptPrefixEditor);
