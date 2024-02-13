'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
if (typeof window !== 'undefined') {
  posthog.init('<ph_project_api_key>', {
    api_host: '<ph_instance_address>'
  })
}
export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}