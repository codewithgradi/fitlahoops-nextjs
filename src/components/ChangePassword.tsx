import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ChangePassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (newPassword !== confirmPassword) {
    return alert("New password and confirm password do not match");
  }

  try {
    const res = await fetch("http://localhost:3000/api/admin/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password:newPassword,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return alert(errorData.message || "Could not update password");
    }

    alert("Password has been updated successfully");
    setUsername("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (err) {
    console.error(err);
    alert("An error occurred while updating the password");
  }
};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          Change Password
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md w-full p-6 bg-white rounded-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Change Password
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Enter your current password and choose a new one.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Label htmlFor="username" className="text-gray-700 font-medium">
              Username 
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter current username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="newPassword" className="text-gray-700 font-medium">
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
               Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg mt-2"
          >
            Update Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
