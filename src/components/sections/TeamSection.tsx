"use client";

import React from "react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/brand-icons";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { ITeamMember } from "@/types";

interface TeamProps {
  teamMembers?: ITeamMember[];
}

export function TeamSection({ teamMembers = [] }: TeamProps) {
  return (
    <section className="py-24 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="glow" className="mb-4 font-mono">WORLD-CLASS TEAM</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Meet Our Senior Software Architects & Engineers
            </h2>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              Veteran software engineers, AI specialists, and UI motion designers passionate about building exceptional software.
            </p>
          </div>
        </ScrollReveal>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <ScrollReveal key={member._id || idx} delay={0.1 * idx}>
              <div className="glass-card rounded-3xl p-6 bg-zinc-950/80 border-zinc-800/80 hover:border-blue-500/40 text-center flex flex-col justify-between h-full group transition-all duration-300">
                <div>
                  {/* Avatar */}
                  <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden bg-zinc-800 border-2 border-zinc-800 group-hover:border-blue-500/50 mb-6 transition-all duration-300">
                    {member.avatar ? (
                      <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-indigo-600">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-400 mt-1 mb-3">{member.position}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  {member.skills && (
                    <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                      {member.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-center gap-3">
                  {member.socialLinks?.github && (
                    <a
                      href={member.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                      aria-label="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socialLinks?.twitter && (
                    <a
                      href={member.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                      aria-label="Twitter"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
