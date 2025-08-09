import { Link } from "react-router";
import { useState, type FormEvent } from "react";
import { Loader } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorField } from "@/components/form/error-field";
import { FormItem } from "@/components/form/form-item";
import { Button } from "@/components/ui/button";
import { useSignUp } from "../hooks/use-sign-up";
import { SortFilterSelect } from "@/components/sort-filter-select";
import type { Role } from "@/types";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [name, setUsername] = useState("");
  const [domain, setDomain] = useState("");

  const { signUp, signUpLoading } = useSignUp();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    signUp(
      { name, email, password, role, domain },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        },
      }
    );
  };

  return (
    <div className="w-full max-w-sm 2xl:max-w-lg">
      <Card className="shadow-xl py-7">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">TaskFlow</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormItem
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <FormItem
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />
            <FormItem
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <div>
              <FormItem
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
              />
              {confirmPassword && password !== confirmPassword && (
                <ErrorField message="Passwords do not match." />
              )}
            </div>
            <SortFilterSelect
              className="w-full"
              value={role}
              onValueChange={(role) => setRole(role as Role)}
              options={[
                { label: "User", value: "user" },
                { label: "Admin", value: "admin" },
                { label: "Project Manager", value: "project_manager" },
              ]}
            />
            <FormItem
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              name="domain"
              label="Work domain"
              placeholder="Enter your domain. i.e design or frontend"
              type="text"
            />
            <Button type="submit" className="w-full">
              {signUpLoading ? (
                <>
                  <Loader /> Wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className=" text-sm flex-center ">
            Already have an account?
            <Button asChild variant="link" className="p-0 h-auto">
              <Link to={"/auth/sign-in"}>Sign in</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
