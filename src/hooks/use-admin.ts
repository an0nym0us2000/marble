import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './use-auth'

export function useAdmin() {
  const { user, loading: authLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false)
        setLoading(false)
        return
      }

      try {
        console.log('Checking admin status for user:', user.id, user.email)

        // Check if user exists in admin_users table
        const { data, error } = await supabase
          .from('admin_users')
          .select('id')
          .eq('user_id', user.id)
          .single()

        console.log('Admin check result:', { data, error })

        if (error) {
          console.error('Error checking admin status:', error)
          setIsAdmin(false)
        } else {
          console.log('User IS admin:', !!data)
          setIsAdmin(!!data)
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      checkAdminStatus()
    }
  }, [user, authLoading])

  return { isAdmin, loading: loading || authLoading }
}
