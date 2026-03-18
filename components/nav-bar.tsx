"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Wrench, Menu, User, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const isConnected = status === "authenticated"
  const userName = session?.user?.name || "User"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">FASTBRIKOL</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/jobs" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Jobs
          </Link>
          <Link href="/how" className="text-sm font-medium hover:text-blue-600 transition-colors">
            How It Works
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-blue-600 transition-colors">
            About Us
          </Link>
        </nav>

        {status === "loading" ? (
          <div className="hidden md:flex h-8 w-8 animate-pulse rounded-full bg-gray-200" />
        ) : isConnected ? (
          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link href="/post-job">Post a Job</Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-full pl-2 pr-4 hover:bg-gray-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/messages" className="cursor-pointer">
                    Messages
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Login
            </Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        )}

        {/* Mobile menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 py-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <Wrench className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">FASTBRIKOL</span>
              </Link>

              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/jobs"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Jobs
                </Link>
                <Link
                  href="/how"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="#"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                {isConnected && (
                  <>
                    <div className="my-2 h-px bg-gray-200" />
                    <Link
                      href="/post-job"
                      className="text-lg font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Post a Job
                    </Link>
                    <Link
                      href="/dashboard"
                      className="text-lg font-medium hover:text-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </>
                )}
              </nav>

              <div className="mt-4 flex flex-col gap-2">
                {isConnected ? (
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                    onClick={() => {
                      setIsMenuOpen(false)
                      signOut({ callbackUrl: "/login" })
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
