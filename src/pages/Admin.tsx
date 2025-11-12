import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, LogOut, Search, Filter, DollarSign, Package, Users, TrendingUp, Shield } from 'lucide-react'
import type { Order } from '@/lib/supabase'

export default function Admin() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error: any) {
      console.error('Error fetching orders:', error)
      toast({
        title: 'Error',
        description: 'Failed to load orders',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const updatePaymentStatus = async (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId)
    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: newStatus })
        .eq('id', orderId)

      if (error) throw error

      toast({
        title: 'Status Updated',
        description: `Payment status updated to ${newStatus}`,
      })

      // Update local state
      setOrders(orders.map(order =>
        order.id === orderId
          ? { ...order, payment_status: newStatus as Order['payment_status'] }
          : order
      ))
    } catch (error: any) {
      console.error('Error updating status:', error)
      toast({
        title: 'Update Failed',
        description: error.message || 'Could not update payment status',
        variant: 'destructive',
      })
    } finally {
      setUpdatingOrderId(null)
    }
  }

  const handleLogout = async () => {
    await signOut()
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully',
    })
    navigate('/')
  }

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.plan_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || order.payment_status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Calculate statistics
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders
      .filter(o => o.payment_status === 'paid' || o.payment_status === 'confirmed')
      .reduce((sum, o) => sum + parseFloat(o.total_amount.toString()), 0),
    pendingOrders: orders.filter(o => o.payment_status === 'pending').length,
    confirmedOrders: orders.filter(o => o.payment_status === 'confirmed').length,
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string }> = {
      pending: { variant: 'outline', label: 'Pending' },
      paid: { variant: 'secondary', label: 'Paid' },
      confirmed: { variant: 'default', label: 'Confirmed' },
      failed: { variant: 'destructive', label: 'Failed' },
    }
    const config = variants[status] || { variant: 'outline', label: status }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-xs text-muted-foreground">Marble Manager</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/plans')}>
                View Site
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.confirmedOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Orders</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Name, email, phone, order ID..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-filter">Payment Status</Label>
                <div className="relative">
                  <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger id="status-filter" className="pl-10">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
            <CardDescription>
              Manage all customer orders and payment statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No orders found
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="border-2">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Order Details */}
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{order.full_name}</h3>
                              <p className="text-sm text-muted-foreground">Order ID: {order.id.slice(0, 8)}...</p>
                            </div>
                            {getStatusBadge(order.payment_status)}
                          </div>

                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Plan:</span> {order.plan_name}</p>
                            <p><span className="font-medium">Email:</span> {order.email}</p>
                            <p><span className="font-medium">Phone:</span> {order.phone}</p>
                            {order.project_address && (
                              <p><span className="font-medium">Address:</span> {order.project_address}</p>
                            )}
                            <p><span className="font-medium">Date:</span> {new Date(order.created_at).toLocaleString('en-IN')}</p>
                          </div>

                          <div className="pt-2 border-t space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Base Amount:</span>
                              <span>₹{parseFloat(order.base_amount.toString()).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>GST (18%):</span>
                              <span>₹{parseFloat(order.gst_amount.toString()).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between font-bold text-base">
                              <span>Total:</span>
                              <span>₹{parseFloat(order.total_amount.toString()).toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Actions */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`status-${order.id}`}>Update Payment Status</Label>
                            <Select
                              value={order.payment_status}
                              onValueChange={(value) => updatePaymentStatus(order.id, value)}
                              disabled={updatingOrderId === order.id}
                            >
                              <SelectTrigger id={`status-${order.id}`}>
                                {updatingOrderId === order.id ? (
                                  <div className="flex items-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                  </div>
                                ) : (
                                  <SelectValue />
                                )}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {order.notes && (
                            <div className="space-y-2">
                              <Label>Notes</Label>
                              <div className="text-sm bg-muted p-3 rounded-md">
                                {order.notes}
                              </div>
                            </div>
                          )}

                          <div className="pt-4 space-y-2">
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                const whatsappNumber = '918079011187'
                                const message = `Hi ${order.full_name}, regarding your order ${order.id.slice(0, 8)} for ${order.plan_name}.`
                                window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
                              }}
                            >
                              Contact on WhatsApp
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
