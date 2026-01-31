import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { PortfolioItem } from '@/lib/content'
import { backdropVariants, modalVariants } from '@/lib/animations'
import { getYouTubeEmbedUrl } from '@/lib/utils'

interface VideoModalProps {
    isOpen: boolean
    onClose: () => void
    project: PortfolioItem | null
}

export function VideoModal({ isOpen, onClose, project }: VideoModalProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    // Handle scroll locking and escape key
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'

            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose()
                }
            }

            window.addEventListener('keydown', handleEscape)
            return () => {
                document.body.style.overflow = 'unset'
                window.removeEventListener('keydown', handleEscape)
            }
        }
    }, [isOpen, onClose])

    if (!mounted) return null

    return createPortal(
        <AnimatePresence>
            {isOpen && project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                        className="fixed inset-0 z-[9998] cursor-pointer bg-dark-900/90 backdrop-blur-sm"
                    />

                    {/* Modal Container - Flexbox for centering */}
                    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center p-4 sm:p-6 pointer-events-none">
                        {/* Modal Content */}
                        <motion.div
                            key="modal"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="pointer-events-auto relative w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl bg-dark-800 shadow-2xl ring-1 ring-white/10"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-md transition-colors hover:bg-black/70 hover:text-white"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Video Container */}
                            <div className="relative aspect-video w-full bg-black">
                                {project.videoUrl && (
                                    <iframe
                                        src={getYouTubeEmbedUrl(project.videoUrl) || ''}
                                        className="absolute inset-0 h-full w-full"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        title={project.title}
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 sm:p-8">
                                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary-400">
                                    <span>{project.category}</span>
                                    <span className="h-1 w-1 rounded-full bg-white/20" />
                                    <span>{project.year}</span>
                                </div>

                                <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
                                    {project.title}
                                </h2>

                                <p className="text-base leading-relaxed text-gray-400 sm:text-lg">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    )
}
