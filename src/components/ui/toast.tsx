// Compatibility shim: re-exports sonner's Toaster so that imports from
// '@/components/ui/toast' (expected by some shadcn components) resolve correctly.
// Do not import radix-based toast APIs from this module.
export { Toaster as Toast, Toaster } from '@/components/ui/sonner'
