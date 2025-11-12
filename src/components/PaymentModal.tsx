import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { QrCode, MessageCircle, CheckCircle, Copy, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'

interface PaymentModalProps {
  open: boolean
  onClose: () => void
  amount: number
  orderId: string
  planName: string
}

export function PaymentModal({ open, onClose, amount, orderId, planName }: PaymentModalProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // Get WhatsApp number from environment or use default
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'

  // UPI ID - Replace with your actual UPI ID
  const upiId = 'samyak979-1@oksbi' // Your UPI ID
  const merchantName = 'Marble Manager'

  // Generate UPI payment link
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&tr=${orderId}&tn=Payment%20for%20${encodeURIComponent(planName)}`

  // Generate QR code URL using free QR API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}&margin=20`

  const handleWhatsAppConfirmation = () => {
    const message = `Hi! I have completed the payment for my order.

*Order Details:*
Order ID: ${orderId}
Plan: ${planName}
Amount Paid: ₹${amount}

Please confirm my payment and activate my plan.

Thank you!`

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')

    toast({
      title: 'Opening WhatsApp',
      description: 'Send the message to confirm your payment',
    })
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    toast({
      title: 'Copied!',
      description: 'Order ID copied to clipboard',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId)
    toast({
      title: 'Copied!',
      description: 'UPI ID copied to clipboard',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Complete Payment
          </DialogTitle>
          <DialogDescription className="text-center">
            Scan QR code or use UPI app to pay
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Order Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Plan:</span>
              <span className="font-semibold">{planName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Amount:</span>
              <span className="text-2xl font-bold text-primary">₹{amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Order ID:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono">{orderId.slice(0, 8)}...</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={copyOrderId}
                >
                  {copied ? <CheckCircle className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="flex flex-col items-center space-y-3">
            <Badge variant="outline" className="text-xs">
              Scan with any UPI app
            </Badge>
            <div className="p-4 bg-white rounded-lg shadow-lg border-2 border-primary/20">
              <img
                src={qrCodeUrl}
                alt="Payment QR Code"
                className="w-64 h-64"
                onError={(e) => {
                  // Fallback if QR generation fails
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EQR Code%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
          </div>

          {/* UPI ID for manual payment */}
          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-semibold text-blue-900">Or pay manually:</p>
            <div className="flex items-center justify-between bg-white p-2 rounded border">
              <span className="text-sm font-mono">{upiId}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyUpiId}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-900 space-y-2">
                <p className="font-semibold">Payment Steps:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Open any UPI app (GPay, PhonePe, Paytm, etc.)</li>
                  <li>Scan the QR code or enter UPI ID manually</li>
                  <li>Verify amount: ₹{amount}</li>
                  <li>Complete the payment</li>
                  <li>Click the WhatsApp button below to confirm</li>
                </ol>
              </div>
            </div>
          </div>

          {/* WhatsApp Confirmation Button */}
          <Button
            onClick={handleWhatsAppConfirmation}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Send Payment Confirmation on WhatsApp
          </Button>

          {/* Alternative: Direct UPI App Button */}
          <Button
            onClick={() => window.location.href = upiLink}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <QrCode className="mr-2 h-5 w-5" />
            Open UPI App Directly
          </Button>

          {/* Note */}
          <p className="text-xs text-center text-gray-500">
            After payment, please send confirmation via WhatsApp for instant activation
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
