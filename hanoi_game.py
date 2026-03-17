import tkinter as tk
from tkinter import messagebox
import time

# --- Design Constants ---
BG_COLOR = "#0F172A"         # Slate 900
POLE_COLOR = "#334155"       # Slate 700
ACCENT_COLOR = "#38BDF8"     # Sky 400
TEXT_COLOR = "#F8FAFC"       # Slate 50
DISK_COLORS = [
    "#F43F5E", # Rose
    "#8B5CF6", # Violet
    "#06B6D4", # Cyan
    "#10B981", # Emerald
    "#F59E0B", # Amber
    "#F97316", # Orange
    "#EF4444", # Red
    "#6366F1", # Indigo
]

class TowerOfHanoi:
    def __init__(self, root):
        self.root = root
        self.root.title("汉诺塔 - 极简至美")
        self.root.geometry("900x600")
        self.root.configure(bg=BG_COLOR)
        self.root.resizable(False, False)

        self.num_disks = 5
        self.moves = 0
        self.min_moves = 2**self.num_disks - 1
        
        # Game State
        self.poles = [[], [], []]
        self.selected_pole = None
        self.disk_objects = {}  # Map disk size to canvas ID
        self.is_animating = False

        self._init_state()
        self._setup_ui()
        self._draw_initial()

    def _init_state(self):
        self.poles = [[], [], []]
        for i in range(self.num_disks, 0, -1):
            self.poles[0].append(i)
        self.moves = 0
        self.selected_pole = None

    def _setup_ui(self):
        # Header
        self.header = tk.Frame(self.root, bg=BG_COLOR, padx=20, pady=20)
        self.header.pack(fill="x")

        self.title_label = tk.Label(
            self.header, text="汉诺塔", font=("Microsoft YaHei", 28, "bold"),
            bg=BG_COLOR, fg=TEXT_COLOR
        )
        self.title_label.pack(side="left")

        self.stats_label = tk.Label(
            self.header, text=f"步数: 0 | 最少步数: {self.min_moves}", 
            font=("Microsoft YaHei", 14), bg=BG_COLOR, fg=ACCENT_COLOR
        )
        self.stats_label.pack(side="right")

        # Game Canvas
        self.canvas = tk.Canvas(
            self.root, bg=BG_COLOR, highlightthickness=0,
            width=900, height=450
        )
        self.canvas.pack(pady=20)

        # Footer / Controls
        self.footer = tk.Frame(self.root, bg=BG_COLOR, pady=20)
        self.footer.pack(fill="x")

        # Controls Container
        self.controls = tk.Frame(self.footer, bg=BG_COLOR)
        self.controls.pack()

        tk.Label(self.controls, text="圆盘数量:", bg=BG_COLOR, fg=TEXT_COLOR, font=("Microsoft YaHei", 10)).pack(side="left", padx=5)
        
        self.size_var = tk.IntVar(value=self.num_disks)
        self.size_options = tk.OptionMenu(self.controls, self.size_var, *range(3, 9), command=self.change_difficulty)
        self.size_options.config(bg=POLE_COLOR, fg=TEXT_COLOR, activebackground=ACCENT_COLOR, highlightthickness=0, relief="flat")
        self.size_options["menu"].config(bg=POLE_COLOR, fg=TEXT_COLOR)
        self.size_options.pack(side="left", padx=10)

        self.reset_btn = tk.Button(
            self.controls, text="重新开始", command=self.reset_game,
            font=("Microsoft YaHei", 10, "bold"), bg=POLE_COLOR, fg=TEXT_COLOR,
            activebackground=ACCENT_COLOR, activeforeground=BG_COLOR,
            relief="flat", padx=20, pady=5, cursor="hand2"
        )
        self.reset_btn.pack(side="left", padx=10)

        self.solve_btn = tk.Button(
            self.controls, text="自动演示", command=self.solve_game,
            font=("Microsoft YaHei", 10, "bold"), bg=POLE_COLOR, fg=TEXT_COLOR,
            activebackground=ACCENT_COLOR, activeforeground=BG_COLOR,
            relief="flat", padx=20, pady=5, cursor="hand2"
        )
        self.solve_btn.pack(side="left", padx=10)

        # Bindings
        self.canvas.bind("<Button-1>", self.on_click)

    def change_difficulty(self, value):
        if self.is_animating: return
        self.num_disks = int(value)
        self.min_moves = 2**self.num_disks - 1
        self.reset_game()

    def solve_game(self):
        if self.is_animating: return
        self.reset_game()
        moves = []
        self._hanoi_recursive(self.num_disks, 0, 2, 1, moves)
        self._run_auto_moves(moves)

    def _hanoi_recursive(self, n, source, target, auxiliary, moves):
        if n > 0:
            self._hanoi_recursive(n - 1, source, auxiliary, target, moves)
            moves.append((source, target))
            self._hanoi_recursive(n - 1, auxiliary, target, source, moves)

    def _run_auto_moves(self, moves):
        if not moves:
            return
        
        source, target = moves.pop(0)
        self.animate_move(source, target)
        self.poles[target].append(self.poles[source].pop())
        self.moves += 1
        self.stats_label.config(text=f"步数: {self.moves} | 最少步数: {self.min_moves}")
        
        # Schedule next move after current animation finishes
        # Animation takes some time, so we wait. 
        # Since _move_to uses .after, we need a way to know when it's done.
        # I'll modify animate_move to accept a callback.
        self.root.after(800, lambda: self._run_auto_moves(moves))

    def _draw_initial(self):
        self.canvas.delete("all")
        
        # Draw Poles
        self.pole_coords = []
        width = 900
        spacing = width // 4
        base_y = 400
        pole_height = 250
        pole_width = 12

        for i in range(3):
            x = (i + 1) * spacing
            self.pole_coords.append(x)
            # Draw Pole Base
            self.canvas.create_rectangle(
                x - 100, base_y, x + 100, base_y + 10,
                fill=POLE_COLOR, outline=""
            )
            # Draw Pole
            self.canvas.create_rectangle(
                x - pole_width//2, base_y - pole_height, 
                x + pole_width//2, base_y,
                fill=POLE_COLOR, outline="", tags=f"pole_{i}"
            )
            # Pole Label
            self.canvas.create_text(
                x, base_y + 30, text=f"柱子 {chr(65+i)}", 
                fill=TEXT_COLOR, font=("Microsoft YaHei", 12)
            )

        # Draw Disks
        self.disk_height = 25
        self.max_disk_width = 180
        self.min_disk_width = 60

        for p_idx, pole in enumerate(self.poles):
            for d_idx, size in enumerate(pole):
                self._draw_disk(p_idx, d_idx, size)

    def _draw_disk(self, pole_idx, pos_idx, size):
        x = self.pole_coords[pole_idx]
        y = 400 - (pos_idx * self.disk_height) - (self.disk_height // 2)
        
        # Calculate width based on size
        w = self.min_disk_width + (size-1) * (self.max_disk_width - self.min_disk_width) // (self.num_disks-1 if self.num_disks > 1 else 1)
        
        color = DISK_COLORS[(size-1) % len(DISK_COLORS)]
        
        # Rounded disk simulation (using polygon or arc if needed, but rectangle is fine with nice colors)
        # To make it look "premium", let's add a slight shadow or glow
        disk_id = self.canvas.create_rectangle(
            x - w//2, y - self.disk_height//2 + 2,
            x + w//2, y + self.disk_height//2 - 2,
            fill=color, outline=TEXT_COLOR, width=1,
            tags=("disk", f"size_{size}")
        )
        self.disk_objects[size] = disk_id
        return disk_id

    def on_click(self, event):
        if self.is_animating: return

        # Find which pole was clicked
        x_click = event.x
        spacing = 900 // 4
        clicked_pole = None

        if abs(x_click - self.pole_coords[0]) < 100: clicked_pole = 0
        elif abs(x_click - self.pole_coords[1]) < 100: clicked_pole = 1
        elif abs(x_click - self.pole_coords[2]) < 100: clicked_pole = 2

        if clicked_pole is None: return

        if self.selected_pole is None:
            # Picking up a disk
            if self.poles[clicked_pole]:
                self.selected_pole = clicked_pole
                size = self.poles[clicked_pole][-1]
                disk_id = self.disk_objects[size]
                self.canvas.itemconfig(disk_id, outline=ACCENT_COLOR, width=3)
        else:
            # Dropping a disk
            source = self.selected_pole
            target = clicked_pole
            
            if source == target:
                # Cancel selection
                size = self.poles[source][-1]
                self.canvas.itemconfig(self.disk_objects[size], outline=TEXT_COLOR, width=1)
                self.selected_pole = None
                return

            # Validate move
            disk_to_move = self.poles[source][-1]
            if not self.poles[target] or self.poles[target][-1] > disk_to_move:
                # Valid move
                self.animate_move(source, target)
                self.poles[target].append(self.poles[source].pop())
                self.moves += 1
                self.stats_label.config(text=f"步数: {self.moves} | 最少步数: {self.min_moves}")
                self.selected_pole = None
                
                # Check for win
                if len(self.poles[2]) == self.num_disks:
                    self.root.after(500, self.show_win)
            else:
                # Invalid move - bounce or flash red?
                size = self.poles[source][-1]
                self.canvas.itemconfig(self.disk_objects[size], outline="#EF4444", width=3)
                self.root.after(200, lambda: self.canvas.itemconfig(self.disk_objects[size], outline=ACCENT_COLOR, width=3))

    def animate_move(self, source_idx, target_idx):
        self.is_animating = True
        size = self.poles[source_idx][-1]
        disk_id = self.disk_objects[size]
        self.canvas.itemconfig(disk_id, outline=TEXT_COLOR, width=1)
        
        # Target coordinates
        target_pos_idx = len(self.poles[target_idx])
        target_x = self.pole_coords[target_idx]
        target_y = 400 - (target_pos_idx * self.disk_height) - (self.disk_height // 2)

        # Current coordinates
        curr_x1, curr_y1, curr_x2, curr_y2 = self.canvas.coords(disk_id)
        curr_x = (curr_x1 + curr_x2) / 2
        curr_y = (curr_y1 + curr_y2) / 2

        # Waypoints: Up -> Side -> Down
        up_y = 100
        
        def step1(): # Move up
            self._move_to(disk_id, curr_x, up_y, step2)

        def step2(): # Move sideways
            self._move_to(disk_id, target_x, up_y, step3)

        def step3(): # Move down
            self._move_to(disk_id, target_x, target_y, finish)

        def finish():
            self.is_animating = False

        step1()

    def _move_to(self, obj_id, tx, ty, callback, speed=10):
        c_x1, c_y1, c_x2, c_y2 = self.canvas.coords(obj_id)
        cx = (c_x1 + c_x2) / 2
        cy = (c_y1 + c_y2) / 2
        
        dx = (tx - cx)
        dy = (ty - cy)
        dist = (dx**2 + dy**2)**0.5
        
        if dist < speed:
            self.canvas.move(obj_id, dx, dy)
            callback()
        else:
            vx = (dx / dist) * speed
            vy = (dy / dist) * speed
            self.canvas.move(obj_id, vx, vy)
            self.root.after(10, lambda: self._move_to(obj_id, tx, ty, callback, speed))

    def reset_game(self):
        self._init_state()
        self.stats_label.config(text=f"步数: 0 | 最少步数: {self.min_moves}")
        self._draw_initial()

    def show_win(self):
        msg = f"恭喜完成！\n总步数: {self.moves}\n完美步数: {self.min_moves}"
        if self.moves == self.min_moves:
            msg += "\n你在最优解的情况下完成了挑战！🌟"
        messagebox.showinfo("胜利", msg)
        self.reset_game()

if __name__ == "__main__":
    root = tk.Tk()
    game = TowerOfHanoi(root)
    root.mainloop()
