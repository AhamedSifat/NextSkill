import { type Editor } from '@tiptap/react';
import { TooltipProvider } from '../ui/tooltip';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Toggle } from '@/components/ui/toggle';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrdered,
  Redo,
  StrikethroughIcon,
  Undo,
} from 'lucide-react';
import { cn } from '@/lib/utils';
interface Props {
  editor: Editor | null;
}

const Menubar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='border border-input border-t-0  border-x-0 rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center'>
      <TooltipProvider>
        <div className='flex flex-wrap gap-1'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('bold')}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                className={cn(
                  editor.isActive('bold') && 'bg-muted text-muted-foreground'
                )}
              >
                <Bold className='h-4 w-4' />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('italic')}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                className={cn(
                  editor.isActive('italic') && 'bg-muted text-muted-foreground'
                )}
              >
                <ItalicIcon className='h-4 w-4' />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('strike')}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
                className={cn(
                  editor.isActive('strike') && 'bg-muted text-muted-foreground'
                )}
              >
                <StrikethroughIcon className='h-4 w-4' />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Strike</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 1 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={cn(
                  editor.isActive('heading', { level: 1 }) &&
                    'bg-muted text-muted-foreground'
                )}
              >
                <Heading1Icon className='h-4 w-4' />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 1</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={cn(
                  editor.isActive('heading', { level: 2 }) &&
                    'bg-muted text-muted-foreground'
                )}
              >
                <Heading2Icon className='h-4 w-4' />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 2</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('heading', { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={cn(
                  editor.isActive('heading', { level: 3 }) &&
                    'bg-muted text-muted-foreground'
                )}
              >
                <Heading3Icon className='h-4 w-4' />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 3</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('bulletList')}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                className={cn(
                  editor.isActive('bulletList') &&
                    'bg-muted text-muted-foreground'
                )}
              >
                <ListIcon className='h-4 w-4' />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bullet List </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive('orderedList')}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                className={cn(
                  editor.isActive('orderedList') &&
                    'bg-muted text-muted-foreground'
                )}
              >
                <ListOrdered className='h-4 w-4' />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ordered List </p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className='w-px h-6 bg-border mx-2 '></div>
        <div className='flex- flex-wrap gap-1'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive({ textAlign: 'left' })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign('left').run()
                }
                className={cn(
                  editor.isActive({ textAlign: 'left' }) &&
                    'bg-muted text-muted-foreground'
                )}
              >
                <AlignLeft className='h-4 w-4' />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Left </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive({ textAlign: 'center' })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign('center').run()
                }
                className={cn(
                  editor.isActive({ textAlign: 'center' }) &&
                    'bg-muted text-muted-foreground'
                )}
              >
                <AlignCenter className='h-4 w-4' />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Center </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={editor.isActive({ textAlign: 'right' })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign('right').run()
                }
                className={cn(
                  editor.isActive({ textAlign: 'right' }) &&
                    'bg-muted text-muted-foreground'
                )}
              >
                <AlignRight className='h-4 w-4' />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Align Right </p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className='w-px h-6 bg-border mx-2 '></div>

        <div className='flex- flex-wrap gap-1'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size='sm'
                variant='ghost'
                type='button'
                disabled={!editor.can().undo()}
                onClick={() => editor.chain().focus().undo().run()}
              >
                <Undo className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size='sm'
                variant='ghost'
                type='button'
                disabled={!editor.can().redo()}
                onClick={() => editor.chain().focus().redo().run()}
              >
                <Redo className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Menubar;
